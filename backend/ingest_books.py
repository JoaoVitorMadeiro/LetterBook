import requests
import uuid
import time
import json
import random
from datetime import datetime

# Configuration
TARGET_COUNT = 10000
BATCH_SIZE = 40
OUTPUT_FILE = "backend/seed_books.sql"
NAMESPACE_UUID = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8') # DNS Namespace

# Google Books API
API_URL = "https://www.googleapis.com/books/v1/volumes"
SEARCH_TERMS = [
    "subject:fiction", "subject:history", "subject:science", "subject:fantasy",
    "subject:mystery", "subject:romance", "subject:horror", "subject:technology",
    "subject:art", "subject:cooking", "subject:travel", "subject:biography",
    "subject:business", "subject:comics", "subject:poetry", "subject:psychology",
    "subject:philosophy", "subject:religion", "subject:thriller", "bestsellers",
    "subject:education", "subject:medical", "subject:law", "subject:engineering",
    "subject:mathematics", "subject:physics", "subject:chemistry", "subject:biology",
    "subject:politics", "subject:economics", "subject:music", "subject:sports",
    "subject:health", "subject:design", "subject:architecture", "subject:computers"
]
# Add year-based queries to boost volume
for year in range(2010, 2025):
    SEARCH_TERMS.append(f"publishedDate:{year}")

# Data Stores (to ensure uniqueness and deterministic IDs)
publishers = {} # name -> uuid
authors = {}    # name -> uuid
genres = {}     # name -> uuid
books = {}      # isbn -> book_data
book_authors = set() # (book_uuid, author_uuid)
book_genres = set()  # (book_uuid, genre_uuid)

def get_deterministic_uuid(name, type_prefix):
    # Generate a UUID based on the name to avoid duplicates in this run
    # and to allow repeatable runs if the DB is clean.
    unique_string = f"{type_prefix}:{name.lower().strip()}"
    return str(uuid.uuid5(NAMESPACE_UUID, unique_string))

def clean_text(text):
    if not text:
        return None
    return text.replace("'", "''").strip() # Escape single quotes for SQL

def fetch_books():
    count = 0
    
    for term in SEARCH_TERMS:
        print(f"Searching for: {term}")
        for start_index in range(0, 1000, BATCH_SIZE): # Google limits deeper pagination usually
            if count >= TARGET_COUNT:
                return

            params = {
                "q": term,
                "startIndex": start_index,
                "maxResults": BATCH_SIZE,
                "printType": "books",
                "langRestrict": "pt,en" # Prefer Portuguese and English
            }
            
            try:
                response = requests.get(API_URL, params=params)
                if response.status_code == 429:
                    print("Rate limit hit. Sleeping for 10 seconds...")
                    time.sleep(10)
                    continue
                
                if response.status_code != 200:
                    print(f"Error {response.status_code}: {response.text}")
                    break

                data = response.json()
                items = data.get("items", [])
                
                if not items:
                    break

                for item in items:
                    info = item.get("volumeInfo", {})
                    
                    # Extract Book Info
                    title = clean_text(info.get("title"))
                    
                    # ISBN
                    identifiers = info.get("industryIdentifiers", [])
                    isbn = None
                    for ident in identifiers:
                        if ident["type"] == "ISBN_13":
                            isbn = ident["identifier"]
                            break
                    if not isbn: # Fallback to ISBN_10
                         for ident in identifiers:
                            if ident["type"] == "ISBN_10":
                                isbn = ident["identifier"]
                                break
                    
                    if not isbn or not title:
                        continue
                    
                    if isbn in books:
                        continue

                    # Check Description limit (TEXT is usually large, but safe to truncate if massive)
                    description = clean_text(info.get("description", ""))
                    
                    # Cover
                    image_links = info.get("imageLinks", {})
                    cover_url = clean_text(image_links.get("thumbnail") or image_links.get("smallThumbnail"))

                    # Date (Year)
                    published_date = info.get("publishedDate", "")
                    year = None
                    if published_date:
                        try:
                            year = int(published_date[:4])
                        except:
                            pass

                    # Publisher
                    pub_name = clean_text(info.get("publisher"))
                    pub_id = None
                    if pub_name:
                        if pub_name not in publishers:
                            publishers[pub_name] = get_deterministic_uuid(pub_name, "publisher")
                        pub_id = publishers[pub_name]

                    # Authors
                    author_list = info.get("authors", [])
                    author_ids = []
                    for auth_name in author_list:
                        auth_name = clean_text(auth_name)
                        if auth_name:
                            if auth_name not in authors:
                                authors[auth_name] = get_deterministic_uuid(auth_name, "author")
                            author_ids.append(authors[auth_name])

                    # Genres (Categories)
                    category_list = info.get("categories", [])
                    genre_ids = []
                    for cat_name in category_list:
                        # Categories are often like "Fiction / Fantasy / General". Split them?
                        # For simplicity, take the first part or whole string. 
                        # Let's just take the provided category strings.
                        cat_name = clean_text(cat_name)
                        if cat_name:
                            if cat_name not in genres:
                                genres[cat_name] = get_deterministic_uuid(cat_name, "genre")
                            genre_ids.append(genres[cat_name])

                    # Create Book Object
                    book_id = get_deterministic_uuid(isbn, "book")
                    
                    books[isbn] = {
                        "id": book_id,
                        "titulo": title,
                        "isbn": isbn,
                        "sinopse": description,
                        "capa_url": cover_url,
                        "ano_publicacao": year,
                        "editora_id": pub_id
                    }

                    # Relationships
                    for auth_id in author_ids:
                        book_authors.add((book_id, auth_id))
                    
                    for gen_id in genre_ids:
                        book_genres.add((book_id, gen_id))

                    count += 1
                    if count % 100 == 0:
                        print(f"Collected {count} books...")
                    
                    if count >= TARGET_COUNT:
                        break
                
                time.sleep(0.5) # Polite delay

            except Exception as e:
                print(f"Exception: {e}")
                time.sleep(1)

def generate_sql():
    print(f"Generating SQL for {len(books)} books, {len(authors)} authors, {len(publishers)} publishers, {len(genres)} genres...")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("-- Seed data for LetterBook Catalogo\n")
        f.write("-- Generated by ingest_books.py\n\n")

        # Publishers
        f.write("-- Publishers\n")
        for name, uid in publishers.items():
            f.write(f"INSERT INTO core.editoras (id, nome) VALUES ('{uid}', '{name}') ON CONFLICT (nome) DO NOTHING;\n")
        f.write("\n")

        # Authors
        f.write("-- Authors\n")
        for name, uid in authors.items():
            # Assuming data_nascimento and biografia are null for now
            f.write(f"INSERT INTO core.autores (id, nome) VALUES ('{uid}', '{name}') ON CONFLICT (nome, data_nascimento) DO NOTHING;\n")
        f.write("\n")

        # Genres
        f.write("-- Genres\n")
        for name, uid in genres.items():
            f.write(f"INSERT INTO core.generos (id, nome) VALUES ('{uid}', '{name}') ON CONFLICT (nome) DO NOTHING;\n")
        f.write("\n")

        # Books
        f.write("-- Books\n")
        for isbn, book in books.items():
            pub_val = f"'{book['editora_id']}'" if book['editora_id'] else "NULL"
            sinopse_val = f"'{book['sinopse']}'" if book['sinopse'] else "NULL"
            capa_val = f"'{book['capa_url']}'" if book['capa_url'] else "NULL"
            ano_val = str(book['ano_publicacao']) if book['ano_publicacao'] else "NULL"
            
            f.write(
                f"INSERT INTO core.livros (id, titulo, isbn, sinopse, capa_url, ano_publicacao, editora_id, created_at, updated_at) "
                f"VALUES ('{book['id']}', '{book['titulo']}', '{book['isbn']}', {sinopse_val}, {capa_val}, {ano_val}, {pub_val}, NOW(), NOW()) "
                f"ON CONFLICT (isbn) DO NOTHING;\n"
            )
        f.write("\n")

        # Relationships
        f.write("-- Book Authors\n")
        for bid, aid in book_authors:
            f.write(f"INSERT INTO core.livro_autores (livro_id, autor_id) VALUES ('{bid}', '{aid}') ON CONFLICT DO NOTHING;\n")
        
        f.write("-- Book Genres\n")
        for bid, gid in book_genres:
            f.write(f"INSERT INTO core.livro_generos (livro_id, genero_id) VALUES ('{bid}', '{gid}') ON CONFLICT DO NOTHING;\n")

    print(f"SQL written to {OUTPUT_FILE}")

if __name__ == "__main__":
    fetch_books()
    generate_sql()

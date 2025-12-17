'use client';

import BookCard from '@/components/book-card';
import { Input } from '@/components/ui/input';
import type { Book } from '@/lib/types';
import { Search } from 'lucide-react';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth'; // Assuming you have a withAuth HOC or similar

async function getBooksFromBackend(search?: string): Promise<Book[]> {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    const response = await api.get(`/livros?${params.toString()}`);
    // Backend returns Page<LivroResponse>, so we access .content
    const content = response.data.content || [];
    
    return content.map((item: any) => ({
      id: item.id,
      title: item.titulo,
      author: item.autores && item.autores.length > 0 
        ? item.autores.map((a: any) => a.nome).join(', ') 
        : 'Unknown Author',
      coverImageId: 'book-cover-1', // Fallback for placeholder logic
      coverUrl: item.capaUrl
    }));
  } catch (error) {
    console.error("Failed to fetch books", error);
    return [];
  }
}

function BooksPageContent() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const fetchedBooks = await getBooksFromBackend(debouncedSearchTerm);
        setBooks(fetchedBooks);
        setError(null);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [debouncedSearchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a book..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
          <div className="container mx-auto px-4 py-8 text-center">
            Loading books...
          </div>
      ) : error ? (
          <div className="container mx-auto px-4 py-8 text-center text-red-500">
            {error}
          </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Books Found</h2>
          <p className="text-muted-foreground">
            There are no books in the catalog matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default withAuth(BooksPageContent);
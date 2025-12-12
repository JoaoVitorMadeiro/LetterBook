'use client';

import BookCard from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import type { Book } from '@/lib/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get('/livros');
        // Backend likely returns { content: [...] } for pagination or just [...] array
        // Adapting based on common Spring Boot / standard API patterns seen in previous file searches (e.g. { params: { size: 1000 } })
        const bookList = Array.isArray(data) ? data : (data.content || []);
        
        // Map backend fields to frontend Book interface if necessary
        // Assuming backend returns similar structure or we map it here
        const mappedBooks: Book[] = bookList.map((b: any) => ({
            id: b.id,
            title: b.titulo || b.title,
            author: b.autor?.nome || b.author || 'Unknown Author',
            coverImageId: b.capaId || b.coverImageId, // Using coverImageId as per types.ts
            coverUrl: b.capaUrl || b.coverUrl || b.capa // Mapping potential backend url
        }));

        setBooks(mappedBooks);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a book..."
            className="w-full pl-10"
          />
        </div>
      </div>
      
      {loading ? (
         <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            There are no books in the catalog yet.
          </p>
        </div>
      )}
    </div>
  );
}

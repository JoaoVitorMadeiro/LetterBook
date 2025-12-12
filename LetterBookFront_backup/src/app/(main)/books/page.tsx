import BookCard from '@/components/book-card';
import { Input } from '@/components/ui/input';
import { mockBooks } from '@/lib/mock-data';
import type { Book } from '@/lib/types';
import { Search } from 'lucide-react';

async function getBooks(): Promise<Book[]> {
  // In a real app, this would be an API call.
  // We'll simulate a network delay.
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockBooks;
}

export default async function BooksPage() {
  const books = await getBooks();

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
      {books.length > 0 ? (
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

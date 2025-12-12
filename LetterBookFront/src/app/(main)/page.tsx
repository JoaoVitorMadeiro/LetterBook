
'use client';

import BookCard from '@/components/book-card';
import { Button } from '@/components/ui/button';
import { mockBooks } from '@/lib/mock-data';
import { useAuth } from '@/hooks/useAuth';
import { Crown } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const popularBooks = mockBooks.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">
          Olá, {user?.name?.split(' ')[0] || 'Book Lover'}...
        </h1>
        <p className="text-muted-foreground">Veja o que há de novo hoje.</p>
      </div>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-headline">
            Livros populares desse mês
          </h2>
          <Button variant="link" className="text-primary">
            Ver todos
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section>
        <div className="bg-card border border-primary/20 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Crown className="h-12 w-12 text-primary" />
            <div>
              <h3 className="text-xl font-bold font-headline">Upgrade to PRO</h3>
              <p className="text-muted-foreground">
                Get more features and support the platform.
              </p>
            </div>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Get PRO
          </Button>
        </div>
      </section>
    </div>
  );
}

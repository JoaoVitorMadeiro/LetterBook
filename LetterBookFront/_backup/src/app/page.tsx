'use client';

import React from 'react';
import { BookCard } from '@/components/BookCard';
import { Banner } from '@/components/Banner';
import { Activity } from 'lucide-react';

// Mock Data
const BOOKS = [
  {
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  },
  {
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  },
  {
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  },
  {
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  },
  {
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  },
  {
    coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    userName: "Katie",
    date: "Apr 07"
  }
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12 md:px-12 max-w-7xl animate-in fade-in duration-500">

      {/* Hero Greeting */}
      <section className="mb-16 mt-8 text-center">
        <h1 className="text-3xl font-medium text-text-main md:text-4xl tracking-tight">
          Olá Fulano, faça avaliação do último livro que você leu...
        </h1>
      </section>

      {/* Book Grid Section */}
      <section className="mb-20">
        <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-text-main">Livros populares desse mês</h2>
          <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            <Activity size={16} />
            All Activity
          </button>
        </div>

        {/* Scrollable Grid Container */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 place-items-center sm:place-items-start">
          {BOOKS.map((book, i) => (
            <BookCard
              key={i}
              {...book}
              className="w-full max-w-[180px]"
            />
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="pb-12">
        <Banner />
      </section>
    </div>
  );
}
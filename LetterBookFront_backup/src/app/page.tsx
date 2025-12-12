import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Book, ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" style={{ color: 'hsl(var(--foreground))' }}>
                Track films... you've read.
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl">
                Join a community of book lovers. Share your reads, discover new
                favorites, and keep a beautiful log of your literary journey.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/books">
                    Explore Books
                    <Book className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Book className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold font-headline">Log Your Reads</h3>
                <p className="mt-2 text-muted-foreground">
                  Keep a diary of every book you've read. Rate them, review them,
                  and remember every detail.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-2xl font-bold font-headline">Connect with Friends</h3>
                <p className="mt-2 text-muted-foreground">
                  See what your friends are reading and share your literary journey.
                  Discover great books through your social circle.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </div>
                <h3 className="text-2xl font-bold font-headline">Build Your Watchlist</h3>
                <p className="mt-2 text-muted-foreground">
                  Never forget a book recommendation again. Keep a personal watchlist
                  of books you want to read.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2024 LetterBookFront. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm hover:underline underline-offset-4 text-muted-foreground">
              Login
            </Link>
             <Link href="/register" className="text-sm hover:underline underline-offset-4 text-muted-foreground">
              Register
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

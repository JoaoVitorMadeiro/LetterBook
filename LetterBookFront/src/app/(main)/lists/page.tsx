'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface BookStackProps {
  title: string;
  bookCount: number;
  likes: number;
  comments: number;
  imageUrls: string[];
}

function BookStack({ title, bookCount, likes, comments, imageUrls }: BookStackProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-[2/3] group">
        {imageUrls.slice(0, 3).reverse().map((url, index) => (
          <Card
            key={index}
            className={`absolute w-full h-full border-2 border-[#2a2a2a] overflow-hidden transition-transform duration-300 ease-in-out group-hover:shadow-2xl ${
              index === 0 ? 'group-hover:-translate-x-4 group-hover:-translate-y-2 group-hover:rotate-[-5deg]' : ''
            } ${
              index === 1 ? 'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-[0deg]' : ''
            } ${
              index === 2 ? 'group-hover:translate-x-4 group-hover:-translate-y-2 group-hover:rotate-[5deg]' : ''
            }`}
            style={{ 
              transform: `translateX(${index * 4}px) translateY(-${index * 4}px) rotate(${index * 2}deg)`,
              zIndex: 3 - index,
            }}
          >
            <Image src={url} alt={`Book cover ${index + 1}`} fill style={{ objectFit: "cover" }} />
          </Card>
        ))}
         {imageUrls.length === 0 && (
             <Card className="absolute w-full h-full border-2 border-[#2a2a2a] overflow-hidden bg-gray-800 flex items-center justify-center">
                 <span className="text-gray-500">No books</span>
             </Card>
         )}
      </div>
      <div className="pt-8">
        <h3 className="font-bold text-white truncate">{title}</h3>
        <p className="text-sm text-muted-foreground">{bookCount} livros</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ListaResponse {
    id: string;
    nome: string;
    livrosIds: string[];
    tipo: string;
}

export default function ListsPage() {
    const [myLists, setMyLists] = useState<BookStackProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await api.get('/listas');
                const data: ListaResponse[] = response.data;
                
                const formattedLists: BookStackProps[] = data.map(list => ({
                    title: list.nome,
                    bookCount: list.livrosIds.length,
                    likes: 0, // Placeholder
                    comments: 0, // Placeholder
                    // We don't have book covers yet, so we use placeholders or empty array
                    // In a real app, we would fetch book details or store coverUrls in the list
                    imageUrls: list.livrosIds.map((_, i) => `https://placehold.co/400x600?text=Book+${i+1}`)
                }));
                setMyLists(formattedLists);
            } catch (error) {
                console.error("Failed to fetch lists:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLists();
    }, []);

    const featuredLists = [
        { title: "21st Century Classics", bookCount: 50, likes: 1200, comments: 88, imageUrls: ["https://picsum.photos/seed/7/400/600", "https://picsum.photos/seed/8/400/600", "https://picsum.photos/seed/9/400/600"] },
        { title: "Philosophy 101", bookCount: 25, likes: 850, comments: 42, imageUrls: ["https://picsum.photos/seed/10/400/600", "https://picsum.photos/seed/11/400/600", "https://picsum.photos/seed/12/400/600"] },
    ];


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Minhas Listas</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/create-list">Criar Lista</Link>
        </Button>
      </div>

      <section className="mb-12">
        {loading ? (
             <div className="text-white">Loading...</div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
            {myLists.length > 0 ? (
                myLists.map(list => <BookStack key={list.title} {...list} />)
            ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                    You haven't created any lists yet.
                </div>
            )}
            </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-6">Listas em Destaque</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
          {featuredLists.map(list => <BookStack key={list.title} {...list} />)}
        </div>
      </section>
    </div>
  );
}
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockBooks } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Book, Bookmark, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = mockBooks.find(b => b.id === params.id);
  const placeholder = PlaceHolderImages.find(p => p.id === book?.coverImageId);

  if (!book || !placeholder) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Book not found</h1>
      </div>
    );
  }

  const averageRating = 4.5;
  const totalRatings = 1234;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <aside className="md:col-span-1">
          <Card className="overflow-hidden sticky top-24">
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative">
                <Image
                  src={placeholder.imageUrl}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <div className="mt-4 flex gap-2">
            <Button className="w-full">
              <Book className="mr-2 h-4 w-4" /> Marcar como lido
            </Button>
            <Button variant="outline" className="w-full">
              <Bookmark className="mr-2 h-4 w-4" /> Adicionar à Wishlist
            </Button>
          </div>
        </aside>

        <main className="md:col-span-2">
          <h1 className="text-4xl font-bold font-headline">{book.title}</h1>
          <h2 className="text-xl text-muted-foreground mt-1">
            por {book.author}
          </h2>

          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-white text-base">{averageRating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">
              ({totalRatings.toLocaleString()} avaliações)
            </span>
          </div>

          <Separator className="my-8" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Sinopse</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
           <div className="mt-8">
             <h3 className="text-lg font-semibold mb-4">Detalhes</h3>
             <div className="grid grid-cols-2 gap-4 text-sm">
               <div className="text-muted-foreground">Editora</div>
               <div>Publisher Inc.</div>
               <div className="text-muted-foreground">ISBN</div>
               <div>978-0345391803</div>
               <div className="text-muted-foreground">Gêneros</div>
               <div><Badge variant="outline">Sci-Fi</Badge> <Badge variant="outline">Adventure</Badge></div>
             </div>
           </div>


          <Separator className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle>Avaliações de Usuários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={`https://picsum.photos/seed/user${i}/40/40`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">User {i}</p>
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, j) => (
                           <Star key={j} className={`w-4 h-4 ${j < 4 ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      This is a fantastic book! A must-read for any fan of the genre. The world-building is incredible.
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                 <MessageSquare className="mr-2 h-4 w-4" />
                 Escrever uma avaliação
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

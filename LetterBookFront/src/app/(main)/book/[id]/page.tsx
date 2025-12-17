import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Book, Bookmark, MessageSquare, Star } from 'lucide-react';
import Image from 'next/image';
import { ReviewList } from '@/components/review-list';

async function getBook(id: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/livros/${id}`, {
      cache: 'no-store' // Ensure fresh data
    });
    if (!res.ok) return null;
    const item = await res.json();
    return {
      id: item.id,
      title: item.titulo,
      author: item.autores && item.autores.length > 0 
        ? item.autores.map((a: any) => a.nome).join(', ') 
        : 'Unknown Author',
      coverImageId: 'book-cover-1',
      coverUrl: item.capaUrl,
      description: item.sinopse,
      publisher: item.editora?.nome,
      isbn: item.isbn,
      genres: item.generos?.map((g: any) => g.nome) || []
    };
  } catch (error) {
    console.error("Failed to fetch book", error);
    return null;
  }
}

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);
  const placeholder = PlaceHolderImages.find(p => p.id === book?.coverImageId);
  const imageUrl = book?.coverUrl || placeholder?.imageUrl;

  if (!book) {
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
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                )}
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
              {book.description || "Sinopse indisponível."}
            </p>
          </div>
          
           <div className="mt-8">
             <h3 className="text-lg font-semibold mb-4">Detalhes</h3>
             <div className="grid grid-cols-2 gap-4 text-sm">
               <div className="text-muted-foreground">Editora</div>
               <div>{book.publisher || "N/A"}</div>
               <div className="text-muted-foreground">ISBN</div>
               <div>{book.isbn || "N/A"}</div>
               <div className="text-muted-foreground">Gêneros</div>
               <div>
                 {book.genres.length > 0 ? (
                   book.genres.map((g: string) => <Badge key={g} variant="outline" className="mr-1">{g}</Badge>)
                 ) : "N/A"}
               </div>
             </div>
           </div>


          <Separator className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle>Avaliações de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewList bookId={book.id} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

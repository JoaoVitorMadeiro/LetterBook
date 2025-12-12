import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Book } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === book.coverImageId);
  const imageUrl = book.coverUrl || placeholder?.imageUrl;

  return (
    <Link href={`/book/${book.id}`} className="group">
      <Card className="overflow-hidden h-full transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20 border-transparent hover:border-primary/50">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                data-ai-hint={placeholder?.imageHint}
              />
            ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs p-2 text-center">
                    No Cover
                </div>
            )}
          </div>
          <div className="p-2">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {book.author}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

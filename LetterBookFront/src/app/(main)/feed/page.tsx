'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Send, Star } from 'lucide-react';
import Image from 'next/image';

const feedItems = [
  {
    type: 'review',
    user: { name: 'Carla', avatarUrl: 'https://picsum.photos/seed/user-carla/40/40' },
    book: { title: 'Dune', author: 'Frank Herbert', coverUrl: 'https://picsum.photos/seed/1/200/300' },
    rating: 5,
    review: 'Uma obra-prima absoluta. A construção do mundo é de outro nível. Leitura obrigatória para qualquer fã de ficção científica.',
    likes: 12,
    comments: 3,
  },
  {
    type: 'post',
    user: { name: 'Bruno', avatarUrl: 'https://picsum.photos/seed/user-bruno/40/40' },
    post: 'Alguém mais está animado para a adaptação do "Problema dos 3 Corpos"? Acabei de reler o livro e minhas expectativas estão altíssimas!',
    likes: 25,
    comments: 8,
  }
];

export default function FeedPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Feed</h1>
      
      <Card className="mb-8">
        <CardContent className="p-4">
            <div className="flex gap-4">
                 <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/user-me/40/40" />
                    <AvatarFallback>Eu</AvatarFallback>
                 </Avatar>
                 <div className="w-full">
                    <Textarea placeholder="No que você está pensando?" className="mb-2"/>
                    <div className="flex justify-end">
                        <Button size="sm"><Send className="h-4 w-4 mr-2" />Postar</Button>
                    </div>
                 </div>
            </div>
        </CardContent>
      </Card>


      <div className="space-y-8">
        {feedItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={item.user.avatarUrl} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{item.user.name} 
                      <span className="text-muted-foreground font-normal"> {item.type === 'review' ? 'avaliou um livro' : 'fez um post'}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">2 horas atrás</p>
                </div>
              </div>

              {item.type === 'review' && item.book && (
                <div className="flex gap-4 bg-card p-4 rounded-md border">
                    <div className="w-24 flex-shrink-0">
                        <Image src={item.book.coverUrl} alt={item.book.title} width={200} height={300} className="rounded-md" />
                    </div>
                    <div className="flex-grow">
                         <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`}/>
                            ))}
                         </div>
                         <h4 className="font-bold">{item.book.title}</h4>
                         <p className="text-sm text-muted-foreground">{item.review}</p>
                    </div>
                </div>
              )}

              {item.type === 'post' && (
                <p className="text-muted-foreground">{item.post}</p>
              )}

              <div className="flex gap-6 items-center mt-4 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-5 w-5" /> {item.likes}
                </Button>
                 <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="h-5 w-5" /> {item.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

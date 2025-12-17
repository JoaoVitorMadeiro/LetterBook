'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Send, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface FeedItem {
  id: string;
  type: 'review' | 'post';
  user: {
    name: string;
    avatarUrl: string;
  };
  book?: {
    title: string;
    author: string;
    coverUrl: string;
  };
  rating?: number;
  review?: string;
  post?: string;
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
}

export default function FeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await api.get('/feed');
        const data = response.data.content || [];
        
        const mappedItems: FeedItem[] = data.map((item: any) => ({
          id: item.id,
          type: item.tipo === 'AVALIACAO' ? 'review' : 'post',
          user: { 
            name: item.nomeUsuario || 'Usuário Desconhecido', 
            avatarUrl: item.fotoUsuario || `https://ui-avatars.com/api/?name=${item.nomeUsuario || 'User'}` 
          },
          book: item.tipo === 'AVALIACAO' ? { 
            title: item.tituloLivro || 'Livro Desconhecido', 
            author: 'Autor Desconhecido', // Backend doesn't send author yet
            coverUrl: item.capaLivro || 'https://placehold.co/200x300?text=Capa' 
          } : undefined,
          rating: item.nota,
          review: item.resenha,
          post: item.comentario, // Map comments to 'post' text for now
          likes: item.totalCurtidas || 0,
          comments: item.totalComentarios || 0,
          createdAt: item.createdAt,
          isLiked: item.curtidoPorMim
        }));

        setFeedItems(mappedItems);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError('Falha ao carregar o feed.');
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, []);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-6">Feed</h1>
      
      <Card className="mb-8">
        <CardContent className="p-4">
            <div className="flex gap-4">
                 <Avatar>
                    <AvatarImage src="https://placehold.co/40x40?text=Eu" />
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

      {loading ? (
        <div className="text-center py-8">Carregando feed...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : feedItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Nenhuma atividade recente.</div>
      ) : (
        <div className="space-y-8">
          {feedItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={item.user.avatarUrl} />
                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <p className="font-semibold">{item.user.name} 
                        <span className="text-muted-foreground font-normal"> {item.type === 'review' ? 'avaliou um livro' : 'comentou'}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
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
                                  <Star key={i} className={`w-5 h-5 ${i < (item.rating || 0) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`}/>
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
                  <Button variant="ghost" size="sm" className={`flex items-center gap-2 ${item.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}>
                      <Heart className={`h-5 w-5 ${item.isLiked ? 'fill-current' : ''}`} /> {item.likes}
                  </Button>
                   <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                      <MessageCircle className="h-5 w-5" /> {item.comments}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

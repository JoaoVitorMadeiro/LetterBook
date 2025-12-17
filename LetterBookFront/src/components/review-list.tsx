'use client';

import { useEffect, useState, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { api } from '@/services/api';
import { ReviewDialog } from './review-dialog';

interface Review {
  id: string;
  usuarioId: string;
  nota: number;
  resenha: string;
  createdAt: string;
  // user info placeholders
  userName?: string; 
  userAvatar?: string;
}

export function ReviewList({ bookId }: { bookId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await api.get(`/avaliacoes/livro/${bookId}`);
      // Sort by newest
      const sorted = (response.data || []).sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReviews(sorted);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center text-muted-foreground">Carregando avaliações...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Ainda não há avaliações para este livro. Seja o primeiro!
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=User&background=random`} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Usuário (ID: {review.usuarioId.substring(0, 8)}...)</p>
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                     <Star key={j} className={`w-4 h-4 ${j < review.nota ? 'fill-current' : 'text-muted-foreground'}`} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {review.resenha}
              </p>
            </div>
          </div>
        ))
      )}
      
      <ReviewDialog bookId={bookId} onReviewSubmitted={fetchReviews} />
    </div>
  );
}

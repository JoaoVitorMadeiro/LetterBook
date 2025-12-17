'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare } from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  bookId: string;
  onReviewSubmitted: () => void;
}

export function ReviewDialog({ bookId, onReviewSubmitted }: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Nota obrigatória",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await api.post('/avaliacoes', {
        livroId: bookId,
        nota: rating,
        resenha: review
      });

      toast({
        title: "Sucesso!",
        description: "Sua avaliação foi publicada.",
      });

      setOpen(false);
      setRating(0);
      setReview('');
      onReviewSubmitted();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast({
        title: "Erro",
        description: "Falha ao enviar avaliação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <MessageSquare className="mr-2 h-4 w-4" />
          Escrever uma avaliação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Avaliar Livro</DialogTitle>
          <DialogDescription>
            Compartilhe sua opinião com a comunidade.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Escreva sua resenha aqui (opcional)..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="h-32"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Enviando...' : 'Publicar Avaliação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

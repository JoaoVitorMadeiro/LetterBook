import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  CircularProgress,
  CardMedia,
  Grid,
  Paper,
  Chip,
  Button,
  TextField,
  Rating,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api'

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Fetch book details
  useEffect(() => {
    let isMounted = true
    async function fetchBookDetail() {
      try {
        const { data } = await api.get(`/api/livros/${id}`)
        if (isMounted) {
          setBook(data)
        }
      } catch (err) {
        if (isMounted) {
          setError('Livro não encontrado ou erro ao carregar detalhes.')
          console.error("Error fetching book details:", err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchBookDetail()
    return () => { isMounted = false }
  }, [id])

  // Fetch reviews
  useEffect(() => {
    let isMounted = true
    async function fetchReviews() {
      try {
        const { data: allReviews } = await api.get(`/api/v1/avaliacoes/livro/${id}`)
        if (isMounted) {
          setReviews(allReviews)
        }
        const { data: userReview } = await api.get(`/api/v1/avaliacoes/me/livro/${id}`).catch(() => ({ data: null })); // Handle 404 for no user review
        if (isMounted && userReview) {
          setMyReview(userReview)
          setRating(userReview.nota)
          setReviewText(userReview.resenha)
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    }
    if (book) { // Only fetch reviews if book data is available
      fetchReviews()
    }
    return () => { isMounted = false }
  }, [book, id])

  const handleSubmitReview = async () => {
    setIsSubmittingReview(true)
    try {
      const reviewPayload = {
        livroId: id,
        nota: rating,
        resenha: reviewText,
      };

      if (myReview && editMode) {
        await api.put(`/api/v1/avaliacoes/livro/${id}`, reviewPayload);
      } else {
        await api.post('/api/v1/avaliacoes', reviewPayload);
      }
      
      // Re-fetch reviews to update the list
      const { data: updatedReviews } = await api.get(`/api/v1/avaliacoes/livro/${id}`);
      setReviews(updatedReviews);
      const { data: updatedMyReview } = await api.get(`/api/v1/avaliacoes/me/livro/${id}`);
      setMyReview(updatedMyReview);
      setEditMode(false);
    } catch (err) {
      console.error("Error submitting review:", err)
      // Optionally display error to user
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const handleDeleteReview = async () => {
    try {
      await api.delete(`/api/v1/avaliacoes/livro/${id}`);
      setMyReview(null);
      setRating(0);
      setReviewText('');
      // Re-fetch reviews to update the list
      const { data: updatedReviews } = await api.get(`/api/v1/avaliacoes/livro/${id}`);
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  if (!book) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography>Nenhum livro encontrado.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            image={book.capaUrl || 'https://via.placeholder.com/300x450?text=Sem+Capa'}
            alt={book.titulo}
            sx={{ width: '100%', height: 'auto', borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>{book.titulo}</Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            por {book.autores?.map(a => a.nome).join(', ')}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Editora:</strong> {book.editora?.nome}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Gêneros:</strong> {book.generos?.map(g => (
              <Chip key={g.id} label={g.nome} sx={{ mr: 0.5, mb: 0.5 }} />
            ))}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Ano de Publicação:</strong> {book.anoPublicacao}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>ISBN:</strong> {book.isbn}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Sinopse:</strong> {book.sinopse}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Média de Avaliações:</strong> {'⭐'.repeat(Math.round(book.mediaAvaliacoes || 0))} ({book.mediaAvaliacoes?.toFixed(1) || '0.0'}) de {book.numeroAvaliacoes || 0} avaliações
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Marcar como Lido</Button>
            <Button variant="outlined" color="secondary">Adicionar à Wishlist</Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>Sua Avaliação</Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Rating
            name="book-rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            disabled={isSubmittingReview}
          />
          <TextField
            label="Escreva sua resenha"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={isSubmittingReview}
          />
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            disabled={isSubmittingReview || rating === 0 || reviewText.trim() === ''}
          >
            {isSubmittingReview ? 'Enviando...' : (myReview && editMode ? 'Atualizar Avaliação' : 'Enviar Avaliação')}
          </Button>
          {myReview && !editMode && (
            <>
              <Button
                variant="outlined"
                color="info"
                sx={{ ml: 1 }}
                onClick={() => setEditMode(true)}
              >
                <EditIcon /> Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
                onClick={handleDeleteReview}
              >
                <DeleteIcon /> Deletar
              </Button>
            </>
          )}
        </Paper>

        <Typography variant="h5" gutterBottom>Outras Avaliações</Typography>
        <Paper sx={{ p: 2 }}>
          {reviews.length === 0 ? (
            <Typography>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</Typography>
          ) : (
            <List>
              {reviews.map((review, index) => (
                <Box key={review.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 1, width: 24, height: 24 }} src={review.avatarUrl} alt={review.userName} />
                          <Typography component="span" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {review.userName}
                          </Typography>
                          <Rating name="read-only" value={review.nota} readOnly size="small" sx={{ ml: 1 }} />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {review.resenha}
                          </Typography>
                          {/* Add tags, emojis, links if they are part of the review DTO */}
                        </>
                      }
                    />
                  </ListItem>
                  {index < reviews.length - 1 && <Divider component="li" />}
                </Box>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  )
}
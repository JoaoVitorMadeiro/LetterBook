'use client';
import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Pagination,
  Rating,
  CircularProgress
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import api from '../services/api'
import Link from 'next/link'

// Helper function to format date
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return date.toLocaleDateString();
};


export default function Feed() {
  const [feedItems, setFeedItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [commentInputs, setCommentInputs] = useState({}) // State to manage comment input for each post

  // Fetch feed items
  useEffect(() => {
    let isMounted = true
    async function loadFeed() {
      setLoading(true)
      try {
        const params = {
          page: page - 1, // Spring Data JPA is 0-indexed
          size: 10, // Items per page
        }
        const { data } = await api.get('/feed', { params })
        if (isMounted) {
          setFeedItems(data.content)
          setTotalPages(data.totalPages)
        }
      } catch (error) {
        console.error("Error loading feed:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    loadFeed()
    return () => { isMounted = false }
  }, [page])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleLike = async (avaliacaoId) => {
    try {
      await api.post(`/feed/avaliacoes/${avaliacaoId}/curtir`)
      // Optimistically update UI or re-fetch feed item
      setFeedItems((prevItems) =>
        prevItems.map((item) =>
          item.id === avaliacaoId
            ? {
                ...item,
                curtidoPorMim: !item.curtidoPorMim,
                likesCount: item.curtidoPorMim ? item.likesCount - 1 : item.likesCount + 1,
              }
            : item
        )
      )
    } catch (error) {
      console.error("Error liking review:", error)
    }
  }

  const handleCommentInputChange = (avaliacaoId, value) => {
    setCommentInputs((prev) => ({ ...prev, [avaliacaoId]: value }))
  }

  const handleSubmitComment = async (avaliacaoId) => {
    const comentario = commentInputs[avaliacaoId]
    if (!comentario || comentario.trim() === '') return

    try {
      await api.post('/feed/comentarios', { avaliacaoId, comentario })
      setCommentInputs((prev) => ({ ...prev, [avaliacaoId]: '' })) // Clear input
      // Re-fetch comments for this specific item or re-fetch entire feed
      // For simplicity, let's re-fetch the entire feed, or ideally, just the comments for the item
      const { data } = await api.get(`/feed`);
      setFeedItems(data.content);
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Seu Feed</Typography>
      {feedItems.length === 0 ? (
        <Typography>Nenhuma atividade no feed. Comece a seguir pessoas e avaliar livros!</Typography>
      ) : (
        <>
          {feedItems.map((item) => (
            <Card key={item.id} sx={{ mb: 3 }}>
              <CardContent>
                {/* User Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={item.usuario?.avatarUrl} alt={item.usuario?.nome} sx={{ width: 40, height: 40, mr: 1 }} />
                  <Box>
                    <Typography variant="subtitle1" component={Link} href={`/profile/${item.usuario?.id}`} sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                      {item.usuario?.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatRelativeTime(item.timestamp)}
                    </Typography>
                  </Box>
                </Box>

                {/* Feed Item Content (e.g., Review, New Read, Achievement) */}
                {item.tipo === 'REVIEW' && (
                  <Box>
                    <Typography variant="body1" component="div">
                      avaliou o livro{' '}
                      <Typography component={Link} href={`/books/${item.book?.id}`} sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
                        {item.book?.titulo}
                      </Typography>
                    </Typography>
                    <Rating name="read-only" value={item.nota} readOnly size="small" sx={{ my: 1 }} />
                    <Typography variant="body1" paragraph>{item.resenha}</Typography>
                  </Box>
                )}
                {/* Add other types of feed items here (e.g., NEW_READ, ACHIEVEMENT) */}
                {item.tipo === 'POST' && ( // Generic post type
                    <Typography variant="body1" paragraph>{item.content}</Typography>
                )}

                {/* Interaction Section (Likes, Comments) */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, borderTop: '1px solid #eee', pt: 1 }}>
                  <IconButton onClick={() => handleLike(item.id)} color={item.curtidoPorMim ? 'error' : 'default'}>
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {item.likesCount} Curtidas
                  </Typography>
                  <IconButton>
                    <ChatBubbleOutlineIcon />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {item.comments?.length || 0} Comentários
                  </Typography>
                </Box>

                {/* Comments Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Comentários</Typography>
                  {item.comments && item.comments.length > 0 ? (
                    <List dense>
                      {item.comments.map((comment, idx) => (
                        <ListItem key={idx} disableGutters>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={comment.usuario?.avatarUrl} sx={{ width: 20, height: 20, mr: 1 }} />
                                <Typography component="span" variant="body2" sx={{ fontWeight: 'bold', mr: 0.5 }}>
                                  {comment.usuario?.nome}
                                </Typography>
                                <Typography component="span" variant="body2" color="text.secondary">
                                  {comment.texto}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">Nenhum comentário ainda.</Typography>
                  )}
                  <Box sx={{ display: 'flex', mt: 2 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Adicionar um comentário..."
                      value={commentInputs[item.id] || ''}
                      onChange={(e) => handleCommentInputChange(item.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitComment(item.id);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{ ml: 1 }}
                      onClick={() => handleSubmitComment(item.id)}
                      disabled={!commentInputs[item.id] || commentInputs[item.id].trim() === ''}
                    >
                      Enviar
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  )
}
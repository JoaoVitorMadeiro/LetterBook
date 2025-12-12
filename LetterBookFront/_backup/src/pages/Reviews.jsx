'use client';
import { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Rating, TextField, Typography } from '@mui/material'
import api from '../services/api'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)

  async function load() {
    const { data } = await api.get('/reviews')
    setReviews(data?.items || [])
  }

  useEffect(() => { load() }, [])

  async function submitReview(e) {
    e.preventDefault()
    await api.post('/reviews', { rating, text })
    setText('')
    setRating(0)
    await load()
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Avaliações</Typography>
      <Box component="form" onSubmit={submitReview} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Rating value={rating} onChange={(_, v) => setRating(v)} />
        <TextField value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreva sua resenha..." fullWidth />
        <Button type="submit" variant="contained">Publicar</Button>
      </Box>

      {reviews.map((r) => (
        <Card key={r.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2">{r.user?.name}</Typography>
            <Rating value={r.rating} readOnly size="small" />
            <Typography variant="body2">{r.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}



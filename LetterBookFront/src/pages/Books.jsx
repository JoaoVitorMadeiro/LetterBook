import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import api from '../services/api'

export default function Books() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await api.get('/books', { params: { q: query } })
      if (isMounted) setBooks(data?.items || [])
    }
    load()
    return () => { isMounted = false }
  }, [query])

  return (
    <Box>
      <Typography variant="h5" mb={2}>Catálogo de Livros</Typography>
      <TextField placeholder="Buscar por título, autor, gênero..." fullWidth value={query} onChange={(e) => setQuery(e.target.value)} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {books.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{b.title}</Typography>
                <Typography variant="body2" color="text.secondary">{b.author}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}



import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CardMedia,
} from '@mui/material'
import api from '../services/api'
import { useNavigate } from 'react-router-dom' // Import useNavigate

export default function Books() {
  const navigate = useNavigate()
  const [titleQuery, setTitleQuery] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [sortBy, setSortBy] = useState('titulo') // Default sort by title
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch authors
  useEffect(() => {
    async function fetchAuthors() {
      try {
        const { data } = await api.get('/api/autores', { params: { size: 1000 } }) // Fetch all authors
        setAuthors(data.content)
      } catch (error) {
        console.error("Error fetching authors:", error)
      }
    }
    fetchAuthors()
  }, [])

  // Fetch genres
  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data } = await api.get('/api/generos', { params: { size: 1000 } }) // Fetch all genres
        setGenres(data.content)
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }
    fetchGenres()
  }, [])

  // Fetch books based on filters and pagination
  useEffect(() => {
    let isMounted = true
    const delayDebounceFn = setTimeout(() => {
      async function loadBooks() {
        setLoading(true)
        try {
          const params = {
            page: page - 1, // Spring Data JPA is 0-indexed
            size: 10, // Items per page
            sortBy: sortBy,
            ...(titleQuery && { titulo: titleQuery }),
            ...(selectedAuthor && { autorId: selectedAuthor }),
            ...(selectedGenre && { generoId: selectedGenre }),
          }
          const { data } = await api.get('/api/livros', { params })
          if (isMounted) {
            setBooks(data.content)
            setTotalPages(data.totalPages)
          }
        } catch (error) {
          console.error("Error loading books:", error)
        } finally {
          setLoading(false)
        }
      }
      loadBooks()
    }, 500) // Debounce API call

    return () => {
      isMounted = false
      clearTimeout(delayDebounceFn)
    }
  }, [titleQuery, selectedAuthor, selectedGenre, sortBy, page])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`) // Navigate to a hypothetical book detail page
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Catálogo de Livros</Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Buscar por Título"
            fullWidth
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Autor</InputLabel>
            <Select
              value={selectedAuthor}
              label="Autor"
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>{author.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select
              value={selectedGenre}
              label="Gênero"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>{genre.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortBy}
              label="Ordenar por"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="titulo">Título</MenuItem>
              <MenuItem value="editora.nome">Editora</MenuItem>
              {/* Add more sort options if available in backend, e.g., 'popularity' or 'averageRating' */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <Typography>Carregando livros...</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleBookClick(book.id)}>
                  {book.capaUrl && ( // Assuming 'capaUrl' for cover image
                    <CardMedia
                      component="img"
                      height="200"
                      image={book.capaUrl}
                      alt={book.titulo}
                      sx={{ objectFit: 'contain', p: 1 }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {book.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.autores?.map(a => a.nome).join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Editora: {book.editora?.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gêneros: {book.generos?.map(g => g.nome).join(', ')}
                    </Typography>
                    {/* Placeholder for average rating and reviews count */}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Avaliação: {'☆'.repeat(Math.round(book.mediaAvaliacoes || 0))} ({book.numeroAvaliacoes || 0})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
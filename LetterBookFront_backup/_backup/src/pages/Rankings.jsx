'use client';
import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Pagination,
  Paper
} from '@mui/material'
import api from '../services/api'
import Link from 'next/link'

export default function Rankings() {
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let isMounted = true
    async function fetchRankings() {
      setLoading(true)
      try {
        const params = {
          page: page - 1, // Spring Data JPA is 0-indexed
          size: 10, // Items per page
        }
        const { data } = await api.get('/rankings/global', { params })
        if (isMounted) {
          setRanking(data.content)
          setTotalPages(data.totalPages)
        }
      } catch (error) {
        console.error("Error fetching global rankings:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchRankings()
    return () => { isMounted = false }
  }, [page])

  const handlePageChange = (event, value) => {
    setPage(value)
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
      <Typography variant="h5" mb={2}>Ranking Global de Usuários</Typography>
      {ranking.length === 0 ? (
        <Typography>Nenhum usuário no ranking ainda.</Typography>
      ) : (
        <Paper>
          <List>
            {ranking.map((user, idx) => (
              <Box key={user.userId}>
                <ListItem alignItems="flex-start" component={Link} href={`/profile/${user.userId}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="h6" sx={{ mr: 2 }}>{((page - 1) * 10) + idx + 1}.</Typography>
                  <Avatar src={user.avatarUrl} alt={user.userName} sx={{ mr: 2 }} />
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        {user.userName}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Pontuação Total: {user.totalScore}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Livros Lidos: {user.booksRead} | Avaliações Feitas: {user.reviewsCount}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {idx < ranking.length - 1 && <Divider component="li" />}
              </Box>
            ))}
          </List>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  )
}
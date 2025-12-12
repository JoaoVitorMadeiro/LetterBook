'use client';
import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Pagination,
  Modal,
  Rating,
  CircularProgress
} from '@mui/material'
import api from '../services/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Communities() {
  const router = useRouter()
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [newCommunityName, setNewCommunityName] = useState('')
  const [newCommunityDescription, setNewCommunityDescription] = useState('')
  const [creatingCommunity, setCreatingCommunity] = useState(false)

  useEffect(() => {
    let isMounted = true
    const delayDebounceFn = setTimeout(() => {
      async function fetchCommunities() {
        setLoading(true)
        try {
          const params = {
            page: page - 1, // Spring Data JPA is 0-indexed
            size: 10,
            ...(searchQuery && { nome: searchQuery }),
          }
          const { data } = await api.get('/comunidades', { params })
          if (isMounted) {
            setCommunities(data.content)
            setTotalPages(data.totalPages)
          }
        } catch (error) {
          console.error("Error fetching communities:", error)
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }
      fetchCommunities()
    }, 500) // Debounce search input

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, page])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true)
  }

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false)
    setNewCommunityName('')
    setNewCommunityDescription('')
  }

  const handleCreateCommunity = async () => {
    if (!newCommunityName.trim()) return

    setCreatingCommunity(true)
    try {
      await api.post('/comunidades', { nome: newCommunityName, descricao: newCommunityDescription })
      handleCloseCreateModal()
      fetchCommunities() // Re-fetch communities to show the new one
    } catch (error) {
      console.error("Error creating community:", error)
    } finally {
      setCreatingCommunity(false)
    }
  }

  const handleCommunityClick = (communityId) => {
    router.push(`/communities/${communityId}`)
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>Comunidades</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          label="Buscar Comunidade"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '40%' }}
        />
        <Button variant="contained" onClick={handleOpenCreateModal}>Criar Nova Comunidade</Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : communities.length === 0 ? (
        <Typography>Nenhuma comunidade encontrada.</Typography>
      ) : (
        <Grid container spacing={2}>
          {communities.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.id}>
              <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => handleCommunityClick(c.id)}>
                <CardContent>
                  <Typography variant="h6">{c.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.descricao}</Typography>
                  <Typography variant="body2" color="text.secondary">Membros: {c.numeroMembros || 0}</Typography>
                  {/* Placeholder for Join/Leave button */}
                  <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                    {c.isMember ? 'Sair da Comunidade' : 'Entrar na Comunidade'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="create-community-modal-title"
      >
        <Box sx={style}>
          <Typography id="create-community-modal-title" variant="h6" component="h2" gutterBottom>
            Criar Nova Comunidade
          </Typography>
          <TextField
            label="Nome da Comunidade"
            fullWidth
            margin="normal"
            value={newCommunityName}
            onChange={(e) => setNewCommunityName(e.target.value)}
            disabled={creatingCommunity}
          />
          <TextField
            label="Descrição"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newCommunityDescription}
            onChange={(e) => setNewCommunityDescription(e.target.value)}
            disabled={creatingCommunity}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseCreateModal} disabled={creatingCommunity}>Cancelar</Button>
            <Button variant="contained" onClick={handleCreateCommunity} disabled={creatingCommunity || !newCommunityName.trim()}>
              {creatingCommunity ? 'Criando...' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
'use client';
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material'
import api from '../services/api'

export default function CommunityDetail() {
  const { id } = useParams()
  const [community, setCommunity] = useState(null)
  const [members, setMembers] = useState([])
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMember, setIsMember] = useState(false) // Assuming this comes from backend or user's state

  const fetchCommunityDetails = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/comunidades/${id}`)
      setCommunity(data)
      setIsMember(data.isMember) // Assuming backend tells us if user is a member

      const { data: membersData } = await api.get(`/comunidades/${id}/membros`)
      setMembers(membersData)

      const { data: rankingData } = await api.get(`/comunidades/${id}/ranking`)
      setRanking(rankingData)
    } catch (err) {
      setError('Comunidade não encontrada ou erro ao carregar detalhes.')
      console.error("Error fetching community details:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunityDetails()
  }, [id])

  const handleJoinLeaveCommunity = async () => {
    try {
      if (isMember) {
        await api.delete(`/comunidades/${id}/sair`)
        setIsMember(false)
      } else {
        await api.post(`/comunidades/${id}/entrar`)
        setIsMember(true)
      }
      // Re-fetch members and ranking to update UI
      const { data: membersData } = await api.get(`/comunidades/${id}/membros`)
      setMembers(membersData)

      const { data: rankingData } = await api.get(`/comunidades/${id}/ranking`)
      setRanking(rankingData)
    } catch (err) {
      console.error("Error joining/leaving community:", err)
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

  if (!community) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography>Nenhuma comunidade encontrada.</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>{community.nome}</Typography>
            <Typography variant="body1" paragraph>{community.descricao}</Typography>
            <Typography variant="body2" color="text.secondary">Membros: {members.length}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleJoinLeaveCommunity}>
              {isMember ? 'Sair da Comunidade' : 'Entrar na Comunidade'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Membros</Typography>
            {members.length === 0 ? (
              <Typography>Nenhum membro nesta comunidade ainda.</Typography>
            ) : (
              <List>
                {members.map((member, index) => (
                  <Box key={member.id}>
                    <ListItem>
                      <Avatar sx={{ mr: 2 }} src={member.avatarUrl} alt={member.userName} />
                      <ListItemText
                        primary={member.userName}
                        secondary={member.role}
                      />
                    </ListItem>
                    {index < members.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ranking da Comunidade</Typography>
            {ranking.length === 0 ? (
              <Typography>Nenhum ranking disponível para esta comunidade ainda.</Typography>
            ) : (
              <List>
                {ranking.map((rankedMember, index) => (
                  <Box key={rankedMember.id}>
                    <ListItem>
                      <Avatar sx={{ mr: 2 }} src={rankedMember.avatarUrl} alt={rankedMember.userName} />
                      <ListItemText
                        primary={`${index + 1}. ${rankedMember.userName}`}
                        secondary={`Pontos: ${rankedMember.score}`}
                      />
                    </ListItem>
                    {index < ranking.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

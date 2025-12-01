import { useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, Grid, Paper, Typography, Modal, TextField, Switch, FormControlLabel } from '@mui/material'
import api from '../services/api'

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

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedBio, setEditedBio] = useState('')
  const [editedAvatarUrl, setEditedAvatarUrl] = useState('')
  const [isPublic, setIsPublic] = useState(true) // Placeholder for privacy setting

  useEffect(() => {
    let isMounted = true
    async function loadUserProfile() {
      try {
        const { data } = await api.get('/api/v1/usuarios/me/profile')
        if (isMounted) {
          setUserProfile(data)
          setEditedName(data.name || '')
          setEditedBio(data.bio || '')
          setEditedAvatarUrl(data.avatarUrl || '')
          setIsPublic(data.isPublic || true) // Assuming data has isPublic field
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      }
    }
    loadUserProfile()
    return () => { isMounted = false }
  }, [])

  const handleOpenEditMode = () => {
    setEditMode(true)
    if (userProfile) {
      setEditedName(userProfile.name || '')
      setEditedBio(userProfile.bio || '')
      setEditedAvatarUrl(userProfile.avatarUrl || '')
      setIsPublic(userProfile.isPublic || true)
    }
  }

  const handleCloseEditMode = () => {
    setEditMode(false)
  }

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = {
        name: editedName,
        bio: editedBio,
        avatarUrl: editedAvatarUrl,
        isPublic: isPublic // Include privacy setting
      }
      const { data } = await api.put('/api/v1/usuarios/me/profile', updatedProfile)
      setUserProfile(data) // Update local state with the new profile data
      setEditMode(false)
    } catch (error) {
      console.error("Error updating user profile:", error)
      // Optionally display an error message to the user
    }
  }

  if (!userProfile) return <Typography>Carregando perfil...</Typography>

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={userProfile.avatarUrl} sx={{ width: 72, height: 72 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{userProfile.name}</Typography>
            <Typography variant="body2" color="text.secondary">{userProfile.bio}</Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              {(userProfile.genres || []).map((g) => <Chip key={g} label={g} />)}
            </Box>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleOpenEditMode}>Editar Perfil</Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Livros Lidos</Typography>
            <Typography variant="body2" color="text.secondary">
              Lista de livros lidos (em desenvolvimento)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Lista de Desejos</Typography>
            <Typography variant="body2" color="text.secondary">
              Livros que deseja ler (em desenvolvimento)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Comunidades</Typography>
            <Typography variant="body2" color="text.secondary">
              Comunidades que participa (em desenvolvimento)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Seguidores & Seguindo</Typography>
            <Typography variant="body2" color="text.secondary">
              {userProfile.followersCount || 0} Seguidores / {userProfile.followingCount || 0} Seguindo (em desenvolvimento)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={editMode}
        onClose={handleCloseEditMode}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Editar Perfil
          </Typography>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            label="Biografia"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
          />
          <TextField
            label="URL do Avatar"
            fullWidth
            margin="normal"
            value={editedAvatarUrl}
            onChange={(e) => setEditedAvatarUrl(e.target.value)}
          />
          <FormControlLabel
            control={<Switch checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />}
            label="Perfil Público"
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseEditMode}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveProfile}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
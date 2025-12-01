import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/register', { nome: name, email: email, senha: password })
      navigate('/login')
    } catch {
      setError('Erro ao registrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 420 }} elevation={3}>
        <Typography variant="h5" mb={2}>Criar conta</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Nome" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="E-mail" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </Box>
        <Box mt={2}>
          <Link href="/login">Já tenho conta</Link>
        </Box>
      </Paper>
    </Box>
  )
}



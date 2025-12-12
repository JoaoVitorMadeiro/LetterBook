'use client';
import { useState } from 'react'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import api from '../services/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email: email, senha: password })
      localStorage.setItem('lb_token', data?.token)
      router.push('/')
    } catch {
      setError('Credenciais inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 380 }} elevation={3}>
        <Typography variant="h5" mb={2}>Entrar</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => e?.target && setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => e?.target && setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Link component={NextLink} href="/register">Criar conta</Link>
          <Link component={NextLink} href="/forgot-password">Esqueci minha senha</Link>
        </Box>
      </Paper>
    </Box>
  )
}



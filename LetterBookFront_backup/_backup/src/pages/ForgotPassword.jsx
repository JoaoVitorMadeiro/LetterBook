'use client';
import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material'
import NextLink from 'next/link'
import api from '../services/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 420 }} elevation={3}>
        <Typography variant="h5" mb={2}>Recuperar senha</Typography>
        {sent ? (
          <Typography>Se existir uma conta, enviaremos instruções para o seu e-mail.</Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="E-mail" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar' }
            </Button>
          </Box>
        )}
        <Box mt={2}>
          <Link component={NextLink} href="/login">Voltar ao login</Link>
        </Box>
      </Paper>
    </Box>
  )
}



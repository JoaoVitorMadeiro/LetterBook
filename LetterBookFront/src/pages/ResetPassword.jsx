import { useState } from 'react'
import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.')
      setLoading(false)
      return
    }

    if (!token) {
        setError('Token de redefinição de senha ausente.')
        setLoading(false)
        return
    }

    try {
      await api.post('/auth/reset-password', { token, newPassword })
      setSuccess(true)
    } catch (err) {
      setError('Erro ao redefinir a senha. O token pode ser inválido ou expirado.')
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ p: 4, width: 420 }} elevation={3}>
        <Typography variant="h5" mb={2}>Redefinir Senha</Typography>
        {success ? (
          <>
            <Typography>Sua senha foi redefinida com sucesso.</Typography>
            <Box mt={2}>
              <Link href="/login">Voltar ao login</Link>
            </Box>
          </>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Nova Senha"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirmar Nova Senha"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </Box>
        )}
        {!success && (
          <Box mt={2}>
            <Link href="/login">Voltar ao login</Link>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

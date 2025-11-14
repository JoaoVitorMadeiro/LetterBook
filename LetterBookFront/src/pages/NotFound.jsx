import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h4" gutterBottom>Página não encontrada</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Ir para o início</Button>
    </Box>
  )
}



'use client';
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h4" gutterBottom>Página não encontrada</Typography>
      <Button variant="contained" onClick={() => router.push('/')}>Ir para o início</Button>
    </Box>
  )
}



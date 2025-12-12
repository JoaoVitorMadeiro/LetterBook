import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>LetterBox de Livros</Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/books" style={{ color: 'inherit', textDecoration: 'none' }}>Livros</Link>
            <Link href="/feed" style={{ color: 'inherit', textDecoration: 'none' }}>Feed</Link>
            <Link href="/communities" style={{ color: 'inherit', textDecoration: 'none' }}>Comunidades</Link>
            <Link href="/rankings" style={{ color: 'inherit', textDecoration: 'none' }}>Rankings</Link>
            <Link href="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Perfil</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3, flexGrow: 1 }}>{children}</Container>
    </Box>
  )
}



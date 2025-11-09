import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>LetterBox de Livros</Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link to="/books" style={{ color: 'inherit', textDecoration: 'none' }}>Livros</Link>
            <Link to="/feed" style={{ color: 'inherit', textDecoration: 'none' }}>Feed</Link>
            <Link to="/communities" style={{ color: 'inherit', textDecoration: 'none' }}>Comunidades</Link>
            <Link to="/rankings" style={{ color: 'inherit', textDecoration: 'none' }}>Rankings</Link>
            <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Perfil</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3, flexGrow: 1 }}>{children}</Container>
    </Box>
  )
}



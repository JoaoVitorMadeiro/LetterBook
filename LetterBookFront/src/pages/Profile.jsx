import { useEffect, useState } from 'react'
import { Avatar, Box, Chip, Grid, Paper, Typography } from '@mui/material'
import api from '../services/api'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await api.get('/users/me')
      if (isMounted) setUser(data)
    }
    load()
    return () => { isMounted = false }
  }, [])

  if (!user) return null

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user.avatarUrl} sx={{ width: 72, height: 72 }} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              {(user.genres || []).map((g) => <Chip key={g} label={g} />)}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}



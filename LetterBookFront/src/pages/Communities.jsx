import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import api from '../services/api'

export default function Communities() {
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await api.get('/communities')
      if (isMounted) setCommunities(data?.items || [])
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <Box>
      <Typography variant="h5" mb={2}>Comunidades</Typography>
      {communities.map((c) => (
        <Card key={c.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{c.name}</Typography>
            <Typography variant="body2" color="text.secondary">{c.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}



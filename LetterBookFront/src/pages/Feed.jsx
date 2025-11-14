import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import api from '../services/api'

export default function Feed() {
  const [items, setItems] = useState([])

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await api.get('/feed')
      if (isMounted) setItems(data?.items || [])
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <Box>
      <Typography variant="h5" mb={2}>Feed</Typography>
      {items.map((it) => (
        <Card key={it.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">{it.user?.name}</Typography>
            <Typography variant="body1">{it.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}



import { useEffect, useState } from 'react'
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import api from '../services/api'

export default function Rankings() {
  const [ranking, setRanking] = useState([])

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await api.get('/rankings')
      if (isMounted) setRanking(data?.items || [])
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <Box>
      <Typography variant="h5" mb={2}>Rankings</Typography>
      <List>
        {ranking.map((r, idx) => (
          <ListItem key={r.user?.id} divider>
            <ListItemText primary={`${idx + 1}. ${r.user?.name}`} secondary={`${r.points} pontos`} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}



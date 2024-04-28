import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const NoUserSelectedComponent = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px - 32px)",
        width: "calc(100% - 400px - 32px)",
        display: "flex",
        justifyContent:"center",
         alignItems:"center",
        p: 3,
        m: 2,
      }}
    >
      <Typography variant='h4'>No user selected</Typography>
    </Box>
  )
}

export default NoUserSelectedComponent
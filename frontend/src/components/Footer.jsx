import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
        width: '100%'
      }}
    >
      <Typography variant="body1">
        © 2025 Nishan Bharati. All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer

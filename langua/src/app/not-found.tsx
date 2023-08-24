
'use client'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {

    const router = useRouter();
    return (
      <Box>
          <Typography variant='h1'>
              404 - Page is not found!
          </Typography>
          <Button
          onClick={() => router.push('/')}
          >
              Come back to main page
          </Button>
      </Box>
    )
}

export default NotFound
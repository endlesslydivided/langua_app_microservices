import { CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/4 w-1/2">
        <LinearProgress />
    </div>
  )
}

export default Loading
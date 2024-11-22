import { Avatar, Box, Paper, Typography } from '@mui/material'
import React from 'react'

const EachTask = () => {
  return (
    <Paper elevation={0} variant='outlined' sx={{display:'flex', justifyContent:'space-between',border:'1px solid  #E0E0E0',padding:3,borderRadius:'4px' }}>
    <Avatar/>
    <Typography>りんご</Typography>
  </Paper>

  )
}

export default EachTask
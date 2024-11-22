import { Box, TextField,Button } from '@mui/material'
import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

const Invitations = () => {
  return (
    <>
    <Header/>
  <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
    <TextField
    disabled
    id='outlined-disabled'
    label='招待リンク'
    defaultValue='https://fastshare.com/notification?123456'
    sx={{width:300,marginTop:40}}
    />
    <Button variant='contained' sx={{width:300,marginTop:4}}>リンクを共有</Button>
  
  </Box>
    <Footer/>
  </>
  )
}

export default Invitations
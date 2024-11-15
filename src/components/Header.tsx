import { AppBar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <AppBar elevation={0} position="static" sx={{width:'100vw',margin:'0',height:'80px',backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center' ,borderBottom:'solid 2px #E0E0E0'}}  >
    <Typography variant="h6" component="div"color='black'sx={{marginTop:'50px'}}>
      グループ
    </Typography>
</AppBar>
  )
}

export default Header
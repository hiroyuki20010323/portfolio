import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Header = () => {
 
  return (
    <Box sx={{}}>
      {/* TODO:原始的な方法でアイコンの位置などを調整しているので後で修正する */}
    <AppBar  elevation={0}  sx={{width:'100vw',top:0,height:'80px',backgroundColor:'white',borderBottom:'solid 2px #E0E0E0',position:'fixed',}}  >
    <Toolbar sx={{marginTop:2}}>
    <Typography variant="h6" component="div"color='black' sx={{marginLeft:18,marginRight:12,marginTop:3}}>
      グループ
    </Typography>
    <Avatar component={Link} to='/groupsettings' />
    </Toolbar>
</AppBar>
</Box>
  )
}

export default Header
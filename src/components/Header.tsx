import { AppBar, Typography } from '@mui/material'


const Header = () => {
 
  return (
    <AppBar  elevation={0}  sx={{width:'100vw',margin:'0',height:'80px',backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center' ,borderBottom:'solid 2px #E0E0E0',position:'sticky',}}  >
     
    <Typography variant="h6" component="div"color='black'sx={{marginTop:'50px'}}>
      グループ
    </Typography>
</AppBar>
  )
}

export default Header
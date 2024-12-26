
import Header from './components/Header'
import { Avatar, AvatarGroup, Box, Button, FormControl, TextField, Typography } from '@mui/material'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'

const GroupSettings = () => {
  return (
  
      <>
    
    <Header />
    <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
    <Avatar sx={{width:140,height:140,marginTop:4,marginBottom:4}}/>
    <FormControl component='form' variant='standard' >
      {/* <InputLabel>グループネーム</InputLabel> */}
      <TextField  id='outline-disabled' label='グループネーム'defaultValue='Ishiyama Family' style={{width:280,marginBottom:50}}/>

      <TextField
      id='outlined-multiline-static'
      label='グループ説明'
      multiline
      rows={8}
      defaultValue='グループの説明を書く'
      sx={{marginBottom:4}}
      />
      
      <Typography>
       メンバー
      </Typography>
      <Box sx={{display:'flex',justifyContent:'flex-start'}}>

   <AvatarGroup total={8}  >
  <Avatar/>
  <Avatar/>
  <Avatar/>
  <Avatar/>
  <Avatar/>
</AvatarGroup>
      </Box>

      <Button variant='contained'sx={{height:40,marginTop:10}} disabled>保存</Button>
      <Button variant='contained'sx={{height:40,marginTop:4,marginBottom:8}} component={Link} to='/invitation'>招待</Button>
      <Button variant='outlined' color='error'sx={{marginTop:12,marginBottom:4}}>退出</Button>
    </FormControl>
    </Box>
    <Footer/>
    </>
 
  )
}

export default GroupSettings
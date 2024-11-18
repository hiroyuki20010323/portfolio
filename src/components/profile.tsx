
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';
import { Avatar, Box, Button, FormControl, TextField } from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth);
    navigate("/login");
  }

  return (
  <Box sx={{display:'flex',alignItems:'center',flexFlow:'column'}}>
  <Header />
  <Avatar sx={{width:140,height:140,marginTop:10,marginBottom:10}}/>
  <FormControl component='form' variant='standard' >
  <TextField  id='outline-disabled' label='ユーザーネーム'defaultValue='Hiroyuki Ishiyama' style={{width:280,marginBottom:50}}/>
    <Button variant='contained'sx={{height:40}} disabled>保存</Button>
  </FormControl>
 <Button variant='outlined' color='error'sx={{marginTop:22}}onClick={handleLogout}>ログアウト</Button>
  <Footer/>
  </Box>
  )
}

export default Profile
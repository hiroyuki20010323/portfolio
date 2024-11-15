import { signOut } from 'firebase/auth'
import {  useNavigate } from "react-router-dom";
import { auth } from './auth/firebaseConfig';
import { useAuthContext } from './auth/AuthContext';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth);
    navigate("/login");
  }
const user = useAuthContext();
// console.log(user)
 if(!user){
navigate('/login')
return null;
// リアクトコンポーネントは必ず何か返却する必要があるため、nullを返却する・
  }else{
    return (
      <Box>
    <Header/>
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
         
      </div>
      <Footer/>
      </Box>
    )
  }
}

export default Home
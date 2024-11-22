
import {  useNavigate } from "react-router-dom";

import { useAuthContext } from './auth/AuthContext';
import {  Box, List  } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import GroupList from './components/GroupListItem';
import GroupListItem from "./components/GroupListItem";

const Home = () => {
  const navigate = useNavigate();

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
    <List sx={{overflow:'scroll',paddingTop:'80px',paddingBottom:'80px'}}>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    <GroupListItem/>
    </List>
      
      <Footer/>
      </Box>
    )
  }
}

export default Home
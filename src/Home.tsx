
import {  useNavigate } from "react-router-dom";

import { useAuthContext } from './auth/AuthContext';
import {  Box, List  } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
// import GroupList from './components/GroupListItem';
import GroupListItem from "./components/GroupListItem";
import { useEffect } from "react";
import { auth } from "./auth/firebaseConfig";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuthContext();
  const apiUrl = import.meta.env.VITE_API_URL
  useEffect(()=>{
    (async()=>{
      
      
      if(!user){
        console.log('ログインしてません');
        return
      }
      
      
      const token = await auth.currentUser?.getIdToken();
      const getResponse = await axios.get(`${apiUrl}/api/group`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
              });
      console.log(getResponse)
      
    })()
    
    // useEffect第二引数のuserは、user情報の取得が非同期であるためから配列にするとuser情報が取得される前にapiが叩かれてしまう。
  },[user])

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
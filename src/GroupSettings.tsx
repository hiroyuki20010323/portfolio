import Header from './components/Header'
import { Avatar, AvatarGroup, Box, Button, FormControl, TextField, Typography } from '@mui/material'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'
import { useAuthContext } from './auth/AuthContext'
import { useEffect, useState } from 'react'
import { auth } from './auth/firebaseConfig'
import axios from 'axios'
import { Group } from './Home'
import Loading from './Loading'




const GroupSettings = () => {
  const user = useAuthContext();
  const apiUrl = import.meta.env.VITE_API_URL
  const [groupData, setGroupData] = useState<Group | null>(null)
  useEffect(()=>{
    (async()=>{
      
      
      if(!user){
        console.log('ログインしてません');
        return
      }
      
      
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.get(`${apiUrl}/api/open-group`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setGroupData(response.data)
      
    })()
    
    
    // useEffect第二引数のuserは、user情報の取得が非同期であるためから配列にするとuser情報が取得される前にapiが叩かれてしまう。
  },[user])

  if(!groupData){
    return <Loading/>
  }

  return (
  
      <>
    
    <Header />
    
    <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
    <Avatar sx={{width:140,height:140,marginTop:4,marginBottom:4}} src={groupData?.group_icon || undefined} />
    <FormControl component='form' variant='standard' >
      {/* <InputLabel>グループネーム</InputLabel> */}
      <TextField
        id='outline-disabled'
        label='グループネーム'
        defaultValue={groupData?.group_name}
        style={{width:280,marginBottom:50}}
      />

      <TextField
        id='outlined-multiline-static'
        label='グループ説明'
        multiline
        rows={8}
        defaultValue={groupData?.group_description}
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

      <Button variant='contained'sx={{height:40,marginTop:10}} >保存</Button>
      <Button variant='outlined'sx={{height:40,marginTop:4,marginBottom:8}} component={Link} to='/invitation'>招待</Button>
      <Button variant='outlined' color='error'sx={{marginTop:12,marginBottom:4}}>退出</Button>
    </FormControl>
    </Box>
    <Footer/>
    </>
 
  )
}

export default GroupSettings
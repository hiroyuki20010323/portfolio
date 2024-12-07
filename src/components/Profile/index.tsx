
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/firebaseConfig';
import { Box, Button, FormControl, TextField } from '@mui/material';
import UserIcon from './UserIcon';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type UserProfileData={
  userName:string,
  userIcon:string
}

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth);
    navigate("/login");
  }

  const {control,handleSubmit,setValue} = useForm({mode:'onSubmit',defaultValues:{
    userName:'',
    userIcon:''
  }});

  const [fileUrl,setFileUrl] = useState(null)
  // const [userName,setUserName] =useState('');

  
  const onSubmit = async({userName,userIcon}: UserProfileData) =>{
    try{

      const formData = new FormData();
      formData.append('user_name', userName);
      formData.append('icon_url', userIcon);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

    //  await axios.post('http://localhost:3080/api/profile',formData);

     const patchResponse = await axios.patch('http://localhost:3080/api/profile/10',formData);
     console.log(patchResponse.data)
      
      const getResponse = await axios.get('http://localhost:3080/api/profile/10');
      // console.log(getResponse)
      const {newUserName,fileUrl} = getResponse.data;
      setFileUrl(fileUrl);
      setValue('userName',newUserName)

     

      console.log("アップロード成功")
    }catch(error){
      console.log('アップロードに失敗しました',error)
    }

  }

  useEffect(()=>{
    (async()=>{
      const getResponse = await axios.get('http://localhost:3080/api/profile/10');
      console.log(getResponse)
      
      const {newUserName,fileUrl} = getResponse.data;
      
      setFileUrl(fileUrl);
      setValue('userName',newUserName)
    })()
    
  },[])



 
  return (
  <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
  <Header />
  
  <FormControl  encType='multipart/form-data' component='form' variant='standard' sx={{alignItems:'center'}} onSubmit={ handleSubmit(onSubmit)}>
  <UserIcon setValue={setValue} value={fileUrl} />
  <Controller  name='userName' control={control} rules={{required:{value:true,message:'入力は必須です'}}} render={({field,formState:{errors}}) =>(
<TextField
{...field}
id='outline-disabled' label='ユーザーネーム'
style={{width:280,marginBottom:50}}
error={errors.userName ? true : false}
helperText={errors.userName?.message as string}
/>
  )} />
  
    <Button variant='contained'sx={{width:280,height:40}} onClick={handleSubmit(onSubmit)} >保存</Button>
  </FormControl>
 
 <Button variant='outlined' color='error'sx={{marginTop:22,marginBottom:4}}onClick={handleLogout}>ログアウト</Button>
  <Footer/>
  </Box>
  )
}

export default Profile
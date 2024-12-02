
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../auth/firebaseConfig';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import UserIcon from './UserIcon';
import { useForm,FormProvider, Controller } from 'react-hook-form';


const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth);
    navigate("/login");
  }

  const {control,handleSubmit} = useForm({});

  
  const onSubmit =(data:any) =>{
console.log(data)
  }



 
  return (
  <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
  <Header />
  
  <FormControl component='form' variant='standard' sx={{alignItems:'center'}} onSubmit={handleSubmit(onSubmit)}>
  <UserIcon/>
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
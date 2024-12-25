import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, provider } from './firebaseConfig';
import { Link, useNavigate,  } from 'react-router-dom';

import { Box, TextField, Typography,Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Divider, Avatar} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("");
const [password,setPassword] = useState<string>("");
 const apiUrl = import.meta.env.VITE_API_URL
 
  
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  const  navigate = useNavigate();
  
  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    // 通常はeventが発生した時に、デフォルトでページのリロードが行われるがそれを防ぐ。つまりリロードされない。
    // リロードと再レンダリングは違う、リロードはサーバーからすべてのデータを取得してページの生成を再実行するのに対して、再レンダリングは、reactのコンポーネントを再描画すると言う意味
    
    
try{

 const userCredential = await signInWithEmailAndPassword(auth,email,password)
  const user = userCredential.user

  const idToken = await user.getIdToken(true)
  // console.log(idToken);
  const response = await axios.post(`${apiUrl}/auth/verify`,
    {message:'認証に成功しました！'},
    {
      headers:{
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
  console.log(response.data.message)
  console.log(user);
  
  
  
  navigate('/')
  
}catch(e){
  alert('IDまたはPassWordが違います');
}
  }

  const handleChangeEmail = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setEmail(event.target.value)
   
   
  };
  
  const handleChangePassword =(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    // TextFieldコンポーネントが内部でinput（一行）およびtext（複数行）属性を使用することがあるため、eventの引数はユニオン型で定義した。
  setPassword(event.target.value)
  
  }

  


  const handleGoogleLogin= async()=>{
    try{
const userData =   await signInWithPopup(auth,provider)
const {displayName,photoURL,uid} = userData.user;
const responseData = axios.post(`${apiUrl}/api/user`,{
  displayName,
  photoURL,
  uid
})

console.log((await responseData).data.message);






      navigate('/');
  }catch(error){
    console.log(error)
   }
  }

  

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
 
    <Typography variant='h4' marginTop={10}>
        ログイン
    </Typography>
    <Typography variant='subtitle1'marginTop={5}>初めての方は<Link to={'/signup'}>こちら</Link></Typography>

      <Box component="form" onSubmit={handleSubmit} flexDirection='column' display='flex' alignItems="center" >
       
        <TextField  name='email'type='email' id="email" label="メールアドレス" sx={{width:300,margin:3}} onChange={(e)=>handleChangeEmail(e)} />
      
          <FormControl variant="outlined" sx={{width:300,margin:3}}>
   
   <InputLabel>パスワード</InputLabel>
           <OutlinedInput
           onChange={(e)=>handleChangePassword(e)}
           label="パスワード"
             id="outlined-adornment-password"
             type={showPassword ? 'text' : 'password'}
             endAdornment={
               <InputAdornment position="end">
                 <IconButton
                 
                   onClick={handleClickShowPassword}
                   onMouseDown={handleMouseDownPassword}
                   onMouseUp={handleMouseUpPassword}
                 >
                   {showPassword ? <VisibilityIcon />:<VisibilityOffIcon  />}
                 </IconButton>
               </InputAdornment>
             }
             
           />
           </FormControl>
      
        
          <Button type='submit' variant='contained' sx={{width:300,height:50,margin:3}}>ログイン</Button>
          <Divider  sx={{width:'100%'}}>または</Divider>

          <Button variant='contained' onClick={handleGoogleLogin} sx={{width:300,height:50,margin:3,color:'#e3f2fd' ,backgroundColor: "#e3f2fd", // 背景色
    "&:hover": {
      backgroundColor: "#bbdefb", // ホバー時の背景色
    },}}>
            <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII='
            alt='Google'
            sx={{mr:2,width:28,height:28}}
            
            />
            <Typography variant='button' sx={{color:'black',textTransform: "none"}}>Googleログイン</Typography>
            </Button>
      </Box> 
    </Box>
  )
}

export default Login
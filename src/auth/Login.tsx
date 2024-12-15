import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, provider } from './firebaseConfig';
import { Link, useNavigate,  } from 'react-router-dom';

import { Box, TextField, Typography,Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Divider} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail] = useState<string>("");
const [password,setPassword] = useState<string>("");
 
  
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
  const response = await axios.post('http://localhost:3080/auth/verify',
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
const responseData = axios.post('http://localhost:3080/api/user',{
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
      
        
          <Button type='submit' variant='contained' sx={{width:300,margin:3}}>ログイン</Button>
          <Divider  sx={{width:'100%'}}>または</Divider>

          <Button variant='contained' onClick={handleGoogleLogin} sx={{width:400,margin:3}}>Googleでログイン</Button>
      </Box> 
    </Box>
  )
}

export default Login
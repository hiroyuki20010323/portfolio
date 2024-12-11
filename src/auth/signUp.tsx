// Import the functions you need from the SDKs you need
import { useState } from "react";
import { auth, provider} from "./firebaseConfig"
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Divider, FormControl, IconButton,  InputAdornment,InputLabel,OutlinedInput, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



export const SignUp =()=>{
  const [showPassword, setShowPassword] = useState(false);
const [email,setEmail] = useState<string>("");
const [password,setPassword] = useState<string>("");
const  navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const handleGoogleLogin= async()=>{
    try{
      await signInWithPopup(auth,provider)

      navigate('/');
  }catch(error){
    console.log(error)
   }
  }

  
 




const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
 
  // TODO あとで確認
  createUserWithEmailAndPassword(auth,email,password)
  setEmail('')
  setPassword('')
  navigate('/')
  
}

const handleChangeEmail = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setEmail(event.target.value)
 
};

const handleChangePassword =(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  // TextFieldコンポーネントが内部でinput（一行）およびtext（複数行）属性を使用することがあるため、eventの引数はユニオン型で定義した。
setPassword(event.target.value)

}



return(
  <Box display="flex" flexDirection="column" alignItems="center">
 
  <Typography variant='h4' marginTop={10}>新規登録</Typography>
  <Typography variant='subtitle1'marginTop={5}>ログインは<Link to={'/login'}>こちら</Link></Typography>

<Box component="form" flexDirection='column' display='flex' alignItems="center" onSubmit={handleSubmit}>


<TextField name="email" type="email"  label="メールアドレス"  onChange={(e)=>handleChangeEmail(e)}sx={{width:300,margin:3}}/>
     
<FormControl variant="outlined" sx={{width:300,margin:3}}>
   
   <InputLabel>パスワード</InputLabel>
           <OutlinedInput
           label="パスワード"
           id="outlined-adornment-password"
           type={showPassword ? 'text' : 'password'}
           onChange={(e)=>handleChangePassword(e)}
             endAdornment={
               <InputAdornment position="end">
                 <IconButton
                   // aria-label={
                   //   showPassword ? 'hide the password' : 'display the password'
                   // }
                   onClick={handleClickShowPassword}
                   onMouseDown={handleMouseDownPassword}
                   onMouseUp={handleMouseUpPassword}
                   // edge="end"
                 >
                   {showPassword ? <VisibilityIcon />:<VisibilityOffIcon  />}
                 </IconButton>
               </InputAdornment>
             }
             
           />
           </FormControl>
   
<FormControl variant="outlined"sx={{width:300,margin:3}}>
   
  <InputLabel>確認用パスワード</InputLabel>
          <OutlinedInput
          label="確認用パスワード"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                // aria-label={
                //      showPassword ? 'hide the password' : 'display the password'
                //   }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  
                >
                  {showPassword ?   <VisibilityIcon />:<VisibilityOffIcon  />}
                </IconButton>
              </InputAdornment>
            }
            
          />
          </FormControl>
      
      <Button type="submit" variant='contained' sx={{width:300,margin:3}} size="large">新規登録</Button>
    
    <Divider component='div' sx={{width:'100%'}} >または</Divider>
    </Box>
    
    <Button variant='contained' onClick={handleGoogleLogin} sx={{width:400,margin:3}} >Googleでログイン </Button>
    
    
  </Box>
)

  
}
// Import the functions you need from the SDKs you need
import {  useState } from "react";
import { auth, provider} from "./firebaseConfig"
import {createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Divider, FormControl, FormHelperText, IconButton,  InputAdornment,InputLabel,OutlinedInput, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SignUpModal from "./SignUpModal";



type UserData ={
  email:string
  password:string
  confirmPassword:string

}

export const SignUp =()=>{
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false)
  const [isOpenModal,setIsOpenModal] = useState(false)
  


// const [email,setEmail] = useState<string>("");
// const [password,setPassword] = useState<string>("");
const {handleSubmit,control,watch} = useForm({mode:'onSubmit',defaultValues:{
  email:'',
  password:'',
  confirmPassword:''

}
})
const password = watch('password')
const  navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickConfirmShowPassword = () => setConfirmShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const handleGoogleLogin= async()=>{
    try{
     const result =  await signInWithPopup(auth,provider)
        const response = await axios.post('http://localhost:3080/api/user',{
          uid : result.user.uid,
          displayName:result.user.displayName,
          icon_url:result.user.photoURL
        })
        console.log(response.data.message)
    
      navigate('/');
  }catch(error){
    console.log(error)
   }
  }

const onSubmit = async({email,password}:UserData) =>{
  

 try{ 
  
  const userCredential = await createUserWithEmailAndPassword(auth,email,password)
 
    const user = userCredential.user
    const idToken = await user.getIdToken(true)
    const response = await axios.post('http://localhost:3080/auth/verify',
      {message:'認証に成功しました！'},
      {
        headers:{
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    setIsOpenModal(true);
    console.log(response.data)
    console.log(user);
    
   
   
  
 }catch(e){
  console.log('処理がうまくいきませんでした。');
  
 }
  
}




return(
  <Box display="flex" flexDirection="column" alignItems="center">
 
  <Typography variant='h4' marginTop={10}>新規登録</Typography>
  <Typography variant='subtitle1'marginTop={5}>ログインは<Link to={'/login'}>こちら</Link></Typography>

<Box component="form" flexDirection='column' display='flex' alignItems="center" onSubmit={handleSubmit(onSubmit)}>

<Controller name='email' control={control} rules={{required:'入力は必須です!',pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:'有効なメールアドレスを入力してください'}}} render={({field,formState:{errors}})=>(

<TextField 
{...field}
name="email" type="email"  label="メールアドレス" sx={{width:300,margin:3}}
error={errors.email ? true :false}
helperText={errors.email?.message}
/>

)}/>

<FormControl variant="outlined" sx={{width:300,margin:3}}>
  <Controller name='password' control={control} rules={{required:'パスワードは必須です!',minLength:{
    value:8,
    message:'パスワードは8文字以上で入力してください!'
  },
  }} render={({field,formState:{errors}})=>(
<>
    <InputLabel>パスワード</InputLabel>
           <OutlinedInput
           {...field}
           label="パスワード"
           name="password"
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
             error={errors.password ? true:false}
           
           />
            {errors.password && (
          <FormHelperText error>{errors.password.message}</FormHelperText>
        )}
           </>

  )}/>
   
           </FormControl>
   
<FormControl variant="outlined"sx={{width:300,margin:3}}>
<Controller name='confirmPassword' control={control} rules={{required:'確認用パスワードは必須です!',validate:(value)=>
  value == password || 'パスワードが一致しません'
}} render={({field,formState:{errors}})=>(
    <>
   
  <InputLabel>確認用パスワード</InputLabel>

          <OutlinedInput
          {...field}
          name="confirmPassword"
          label="確認用パスワード"
            id="outlined-adornment-password"
            type={confirmShowPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickConfirmShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  
                >
                  {confirmShowPassword ?   <VisibilityIcon />:<VisibilityOffIcon  />}
                </IconButton>
              </InputAdornment>
            }
            error={errors.confirmPassword ? true:false}
          />
              {errors.confirmPassword && (
          <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>
        )}
        </>
        )}/>
          </FormControl>
      
      <Button type="submit" variant='contained' sx={{width:300,margin:3}} size="large">新規登録</Button>
    
    </Box>
    <Divider component='div' sx={{width:'100%'}} >または</Divider>
    
    <Button variant='contained' onClick={handleGoogleLogin} sx={{width:400,margin:3}} >Googleでログイン </Button>
    {isOpenModal && <SignUpModal setIsOpenModal={setIsOpenModal}/> }
  </Box>
)

  
}
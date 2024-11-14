// Import the functions you need from the SDKs you need
import { useState } from "react";
import { auth } from "./firebaseConfig"
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { Link } from "react-router-dom";



export const SignUp =()=>{
 

// 新規登録
// createUserWithEmailAndPassword(auth,email,password)
// .then((userCredential)=>{
//   const user =userCredential.user;
// })
// .catch((error)=>{
//   const errCode = error.code;
//   const errorMessage =error.message;
// });
  
const [email,setEmail] = useState<string>("");
const [password,setPassword] = useState<string>("");

const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) =>{
  event.preventDefault();
  const {email,password} = event.target.elements;
  // TODO あとで確認
  createUserWithEmailAndPassword(auth,email.value,password.value)
  setEmail('')
  setPassword('')
}

const handleChangeEmail = (event:React.ChangeEvent<HTMLInputElement>)=>{
  setEmail(event.target.value)
 
};

const handleChangePassword =(event:React.ChangeEvent<HTMLInputElement>)=>{
setPassword(event.target.value)
}



return(
  <div>
    <h1>新規登録</h1>
    <form onSubmit={handleSubmit}>

      <label>
email: 
<input name="email" type="email" placeholder="email" onChange={(e)=>handleChangeEmail(e)}/>
      </label>

      <label>
        password: 
        <input name="password"type="password" placeholder="password" onChange={(e)=>handleChangePassword(e)}/>
      </label>
      <button type="submit">登録</button>
    </form>
    ログインは<Link to={'/login'}>こちら</Link>
  </div>
)

  
}
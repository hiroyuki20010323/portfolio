// Import the functions you need from the SDKs you need

import { useRef, useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebaseConfig"


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
  // const {email,password} = event.target.elements;
  console.log(email,password)
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
      <button>登録</button>
    </form>
  </div>
)

  
}
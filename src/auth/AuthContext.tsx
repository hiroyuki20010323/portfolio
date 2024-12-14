import  { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, User} from 'firebase/auth';
import { auth } from "./firebaseConfig";
// import {User} from 'firebase/auth'


const AuthContext = createContext<User | null>(null);



export const useAuthContext=()=>{
  return useContext(AuthContext);
}

export const AuthProvider = ({children}:{children: ReactNode}) =>{
  const [user, setUser] =useState< User | null>(null);
  const [loading,setLoading] = useState(true)

// console.log(user)
  // const value ={
  //   user
  // };
 
  useEffect(()=>{
  const unsubscribed = onAuthStateChanged(auth,(user:any)=>{
    if(user){
      setUser(user);
      setLoading(false)
    }
  
    // console.log(value)
  });

  return ()=>{
    unsubscribed();
  }
},[]);

if(loading){
  return <p>Loading...</p>
}
// TODO あとでちゃんとしたローディング画面を作る。


  return (
    
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    // TODO　あとで確認する
  )
}





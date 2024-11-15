import  { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, User} from 'firebase/auth';
import { auth } from "./firebaseConfig";
// import {User} from 'firebase/auth'


const AuthContext = createContext<string | null>(null);



export const useAuthContext=()=>{
  return useContext(AuthContext);
}

export const AuthProvider = ({children}:{children: ReactNode}) =>{
  const [user, setUser] =useState<string | User>('');

// console.log(user)
  // const value ={
  //   user
  // };
 
  useEffect(()=>{
  const unsubscribed = onAuthStateChanged(auth,(user:any)=>{
    if(user){
      setUser(user);
    }
  
    // console.log(value)
  });

  return ()=>{
    unsubscribed();
  }
},[]);


  return (
    
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    // TODO　あとで確認する
  )
}





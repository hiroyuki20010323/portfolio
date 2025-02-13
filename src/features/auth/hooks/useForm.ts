import { useState } from "react"


export const usePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
 const controlPassword = ()=> setShowPassword((prev) => !prev)
 return{controlPassword,showPassword};
}


import { useState } from "react"
import { auth } from "../../../config/firebaseConfig"
import { api, CustomAxiosRequestConfig } from "../../../lib/axios"
import { useNavigation } from "../../../hooks/useNavigation"
import { signInWithEmailAndPassword } from "firebase/auth"


export const useLogin = () => {
  const [authLoading, setAuthLoading] = useState(false)
  const { toHome } = useNavigation()
  const login = async(email:string,password:string)=>{
    try {
			setAuthLoading(true)
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			
			const response = await api.post(
				`/auth/verify`,
				{ message: "認証に成功しました！" },
				{
					tokenProvider: {
						type: 'specific',
						user: userCredential.user  
					}
				}as CustomAxiosRequestConfig
			)
			console.log(response.data.message)
			toHome();
		} catch (e) {
			alert("IDまたはPassWordが違います")
		} finally {
			setAuthLoading(false)
		}
  }
  return { login, authLoading };
}


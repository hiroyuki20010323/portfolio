import { useState } from "react"
import { AuthRepos } from "../api/Auth"
import { useNavigation } from "../../../hooks/useNavigation"
import { SignUpModalData } from "../components/SignUpModal"

export const useAuth = () => {
	const [authLoading, setAuthLoading] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const { toHome } = useNavigation()

	const login = async (email: string, password: string) => {
		try {
			setAuthLoading(true)
			await AuthRepos.emailAndPasswordLogin(email, password)
			toHome()
		} catch (e) {
			alert("IDまたはPassWordが違います")
		} finally {
			setAuthLoading(false)
		}
	}

	const handleGoogleLogin = async () => {
		try {
			AuthRepos.googleAuth()
			toHome()
		} catch (error) {
			console.log(error)
		}
	}

	const signUp = (email: string, password: string) => {
		try {
			setAuthLoading(true)
			AuthRepos.signUp(email, password)
			setAuthLoading(false)
			setIsOpenModal(true)
		} catch (e) {
			console.log("処理がうまくいきませんでした。")
		}
	}

	const inputUserModal = async (data: SignUpModalData) => {
		setAuthLoading(true)
		AuthRepos.updateUserName(data)
		setAuthLoading(false)
		setIsOpenModal(false)
		toHome()
	}

	return {
		login,
		authLoading,
		setAuthLoading,
		handleGoogleLogin,
		isOpenModal,
		setIsOpenModal,
		signUp,
		inputUserModal
	}
}

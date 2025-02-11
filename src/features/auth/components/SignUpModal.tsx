import { Box, FormControl, TextField } from "@mui/material"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "firebase/auth"
import axios from "axios"
import { auth } from "../../../config/firebaseConfig"
import Loading from "../../../components/Loading"
import { API_URL } from "../../../config"

type ModalControl = {
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>
	authLoading: boolean
}

const SignUpModal = ({
	setIsOpenModal,
	setAuthLoading,
	authLoading
}: ModalControl) => {
	const { control, handleSubmit } = useForm({
		mode: "onSubmit",
		defaultValues: {
			user_name: ""
		}
	})

	const navigate = useNavigate()

	// モーダルをtrueにして表示させる
	const open = true

	// TODOuseStateを使用せずmodalを管理できないか・・・
	const onSubmit = async (data: { user_name: string }) => {
		setAuthLoading(true)
		if (auth.currentUser) {
			const uid = auth.currentUser?.uid
			await updateProfile(auth.currentUser, {
				displayName: data.user_name
			})

			const response = await axios.post(`${API_URL}/api/user`, {
				uid: uid,
				displayName: data.user_name,
				icon_url: null
			})
			console.log(response.data.message)
		}
		console.log(data)
		setAuthLoading(false)
		setIsOpenModal(false)
		console.log(auth.currentUser)
		navigate("/")
	}

	if (authLoading) {
		return <Loading />
	}

	return (
		<Box>
			<Modal
				open={open}
				onClose={() => {}}
				disableEscapeKeyDown
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2
					}}
				>
					<FormControl
						component="form"
						variant="standard"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Typography
							id="modal-modal-title"
							variant="subtitle1"
							component="h2"
							sx={{ mb: 4 }}
						>
							ユーザーネームを設定してください！！
						</Typography>
						<Controller
							name="user_name"
							control={control}
							rules={{ required: "ユーザーネームの入力は必須です！" }}
							render={({ field, formState: { errors } }) => (
								<TextField
									{...field}
									id="outline-disabled"
									name="user_name"
									label="ユーザーネーム"
									sx={{ width: 300, mt: 4, mb: 6 }}
									error={errors.user_name ? true : false}
									helperText={errors.user_name?.message}
								/>
							)}
						/>
						<Button variant="contained" type="submit">
							送信
						</Button>
					</FormControl>
				</Box>
			</Modal>
		</Box>
	)
}

export default SignUpModal

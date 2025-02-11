import { Box, Button, FormControl, TextField } from "@mui/material"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import { Controller, useForm } from "react-hook-form"
import GroupIcon from "./GroupIcon"
import { useState } from "react"
import { useAuthContext } from "../../auth/components/AuthContext"
import { useNavigate } from "react-router-dom"
import { api, CustomAxiosRequestConfig } from "../../../lib/axios"


export type GroupProfileData = {
	group_name: string
	group_description: string
	group_icon: string
}

const CreateGroup = () => {
	const navigate = useNavigate()
	const user = useAuthContext()
	const { control, handleSubmit, setValue } = useForm({
		mode: "onSubmit",
		defaultValues: {
			group_name: "",
			group_description: "",
			group_icon: ""
		}
	})

	const [groupIcon] = useState("")
	// buildする時にset関数をしようしてないとエラーが出るので一時てきにset関数を削除する。

	const onSubmit = async ({
		group_icon,
		group_name,
		group_description
	}: GroupProfileData) => {
		try {
			const formData = new FormData()
			formData.append("group_name", group_name)
			formData.append("group_icon", group_icon)
			formData.append("group_description", group_description)
			formData.append("uid", user?.uid || "")

			for (let pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1])
			}

			const groupPostResponse = await api.post(
				`/api/group`,
				formData,
				{ requiresAuth: false } as CustomAxiosRequestConfig,
			)
			console.log(groupPostResponse.data)
			navigate("/")
		} catch (error) {
			console.log("アップロードに失敗しました", error)
		}
	}

	return (
		<>
			<Header />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexFlow: "column",
					paddingTop: "80px",
					paddingBottom: "80px"
				}}
			>
				<FormControl
					component="form"
					variant="standard"
					sx={{ alignItems: "center" }}
				>
					<GroupIcon setValue={setValue} value={groupIcon} />

					<Controller
						name="group_name"
						control={control}
						rules={{ required: { value: true, message: "入力は必須です" } }}
						render={({ field, formState: { errors } }) => (
							<TextField
								{...field}
								id="outline-disabled"
								label="グループネーム"
								style={{ width: 280, marginBottom: 50 }}
								error={errors.group_name ? true : false}
								helperText={errors.group_name?.message as string}
							/>
						)}
					/>
					<Controller
						name="group_description"
						control={control}
						rules={{ required: { value: false, message: "入力は必須です" } }}
						render={({ field, formState: { errors } }) => (
							<TextField
								{...field}
								sx={{ width: 280 }}
								id="outlined-multiline-static"
								label="グループ説明"
								multiline
								rows={8}
								error={errors.group_description ? true : false}
								helperText={errors.group_description?.message as string}
							/>
						)}
					/>
					<Button
						variant="contained"
						sx={{ height: 40, marginTop: 10, marginBottom: 8, width: 280 }}
						onClick={handleSubmit(onSubmit)}
					>
						作成
					</Button>
				</FormControl>
			</Box>
			<Footer />
		</>
	)
}

export default CreateGroup

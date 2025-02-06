import {
	Box,
	Button,
	CardMedia,
	Fab,
	FormControl,
	IconButton,
	Modal,
	Tab,
	TextField,
	Typography,
} from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useRef, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import { TabList } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TaskItem from "./TaskItem";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { auth } from "./auth/firebaseConfig";
import Loading from "./Loading";

export type TaskData = {
	id: number;
	date: Date;
	tasks: Task[];
};

type Task = {
	id: number;
	taskTitle: string;
	taskDetail: string;
	taskImageUrl: string | null;
	period: string; // ISO 8601 形式の日時文字列
	createdUserId: string;
	createdGroupId: number;
	assigneeUserId: string | null;
	assigneeGroupId: number | null;
	calenderId: number;
	createdAt: string;
	updatedAt: string;
	calendar_id: number;
	createdUser: {
		id: string;
		userId: string;
		groupId: number;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		user: {
			id: string;
			user_name: string;
			icon_url: string;
			createdAt: string;
			updatedAt: string;
		};
	};
};

type TaskFormInputs = {
	taskTitle: string;
	taskDetail: string;
	taskImage: File | string | null;
	dueDate: string;
	dueTime: string;
};

const Task = () => {
	const apiUrl = import.meta.env.VITE_API_URL;

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [image, setImage] = useState<string | undefined>(undefined);
	const [taskValue, setTaskValue] = useState<string>("1");
	const [open, setOpen] = useState<boolean>(false);
	const [tasks, setTasks] = useState<TaskData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { control, handleSubmit, setValue } = useForm<TaskFormInputs>({
		mode: "onSubmit",
		defaultValues: {
			taskTitle: "",
			taskDetail: "",
			taskImage: "",
			dueDate: "",
			dueTime: "",
		},
	});

	useEffect(() => {
		const getTasks = async () => {
			try {
				setIsLoading(true);
				const token = await auth.currentUser?.getIdToken();
				const taskData = await axios.get(`${apiUrl}/api/task`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(taskData.data);
				setTasks(taskData.data);
			} catch (e) {
				console.error("タスクの取得に失敗しました。");
			} finally {
				setIsLoading(false);
			}
		};
		getTasks();
	}, []);

	const handleInput = () => {
		const files = fileInputRef.current?.files;
		if (!files) return;
		const file = files[0];
		setValue("taskImage", file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			setImage(String(e.target?.result));
		};
	};

	const fileUpload = () => {
		fileInputRef.current?.click();
	};

	const onSubmit = async ({
		taskTitle,
		taskDetail,
		taskImage,
		dueDate,
		dueTime,
	}: TaskFormInputs) => {
		try {
			const token = await auth.currentUser?.getIdToken();
			const formData = new FormData();

			if (taskImage) {
				formData.append("taskImage", taskImage);
			}
			formData.append("taskTitle", taskTitle);
			formData.append("taskDetail", taskDetail);
			formData.append("dueDate", dueDate);
			formData.append("dueTime", dueTime);

			for (let pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1]);
			}

			const response = await axios.post(`${apiUrl}/api/task`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			handleCloseModal();
			const taskData = await axios.get(`${apiUrl}/api/task`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTasks(taskData.data);
			console.log(response);
		} catch (e) {
			console.log("なんかのエラーが出ました", e);
		}
	};

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setTaskValue(newValue);
		event;
	};

	const handleOpenModal = () => {
		setOpen(true);
	};
	const handleCloseModal = () => {
		setOpen(false);
	};

	const getPrevWeekTasks = async () => {
		const token = await auth.currentUser?.getIdToken();
		const currentDate = tasks[0].date;
		const response = await axios.get(`${apiUrl}/api/task/prev-week`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: { date: currentDate },
		});
		setTasks(response.data);
		console.log(tasks[0].date);
	};

	const getNextWeekTasks = async () => {
		const token = await auth.currentUser?.getIdToken();
		const currentDate = tasks[6].date;
		const response = await axios.get(`${apiUrl}/api/task/next-week`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: { date: currentDate },
		});
		setTasks(response.data);
		console.log(tasks[6].date);
	};

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	return (
		<>
			<Header />

			<TabContext value={taskValue}>
				<Box
					sx={{
						overflow: "scroll",
						paddingTop: "80px",
						paddingBottom: "120px",
					}}
				>
					<TabList onChange={handleChange} centered>
						<Tab label="全体タスク" value="1" />
						{/* <Tab label="請負中のタスク" value="2" />
						<Tab label="依頼したタスク" value="3" /> */}
					</TabList>

					<TabPanel value="1" sx={{ padding: 0 }}>
						{isLoading ? (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "28vh",
									flexFlow: "column",
									marginBottom: 40,
								}}
							>
								<Loading />
								<Typography>グループは作成しましたか？</Typography>
							</Box>
						) : (
							<TaskItem tasks={tasks} />
						)}
					</TabPanel>
					{/* <TabPanel value="2" sx={{ padding: 0 }}>
						<WeekTask />
					</TabPanel>

					<TabPanel value="3" sx={{ padding: 0 }}>
						<WeekTask />
					</TabPanel> */}

					<Fab
						color="primary"
						aria-label="add"
						sx={{
							position: "fixed",
							bottom: 80,
							right: 16,
						}}
						onClick={handleOpenModal}
					>
						<AddIcon />
					</Fab>
					<Modal
						open={open}
						onClose={handleCloseModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						{/* TODOモーダルのレイアウト別コンポーネントに切り出す */}
						<Box sx={style}>
							<Box
								sx={{
									alignItems: "center",
									display: "flex",
									flexDirection: "column",
									width: "100%",
									height: "calc(100vh - 100px)",
									overflowY: "auto",
									overflowX: "hidden",
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginBottom: 4,
									}}
								>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2"
									>
										タスク追加
									</Typography>
									<Button onClick={handleCloseModal} color="error">
										閉じる
									</Button>
								</Box>

								<FormControl
									component="form"
									variant="standard"
									onSubmit={handleSubmit(onSubmit)}
								>
									<Controller
										name="taskTitle"
										control={control}
										rules={{
											required: {
												value: true,
												message: "タイトルの入力は流石に必須です",
											},
										}}
										render={({ field, formState: { errors } }) => (
											<TextField
												{...field}
												id="outline-disabled"
												label="タスク名"
												style={{ width: 280, marginBottom: 50 }}
												error={errors.taskTitle ? true : false}
												helperText={errors.taskTitle?.message}
											/>
										)}
									/>
									<Controller
										name="taskDetail"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												id="outlined-multiline-static"
												name="taskDetail"
												label="タスク詳細"
												multiline
												rows={8}
											/>
										)}
									/>

									<Box sx={{ display: "flex", alignItems: "center" }}>
										{image ? (
											<CardMedia
												onClick={fileUpload}
												component="img"
												height="300"
												image={image}
												sx={{ width: 280, objectFit: "contain" }}
											/>
										) : (
											<Button
												onClick={fileUpload}
												variant="outlined"
												sx={{ width: 280, height: 194 }}
											>
												画像を選択
											</Button>
										)}
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleInput}
											style={{ display: "none" }}
											accept="image/*"
										/>
									</Box>

									<Typography sx={{ marginTop: 2 }}>期限指定</Typography>

									<Controller
										name="dueDate"
										rules={{
											required: {
												value: true,
												message: "期限日は必ず指定しましょう",
											},
										}}
										control={control}
										render={({ field, formState: { errors } }) => (
											<TextField
												{...field}
												type="date"
												error={errors.dueDate ? true : false}
												helperText={errors.dueDate?.message}
											/>
										)}
									/>
									<Controller
										name="dueTime"
										control={control}
										render={({ field }) => <TextField {...field} type="time" />}
									/>

									<Button
										variant="contained"
										sx={{ height: 40, marginTop: 6, marginBottom: 4 }}
										onClick={handleSubmit(onSubmit)}
									>
										追加
									</Button>
								</FormControl>
							</Box>
						</Box>
						{/* ここまで */}
					</Modal>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<IconButton
							aria-label="delete"
							size="large"
							onClick={getPrevWeekTasks}
						>
							<ArrowBackIosNewIcon fontSize="inherit" />
						</IconButton>

						<Typography
							sx={{
								marginRight: "10px",
								marginLeft: "10px",
								width: "200px",
								textAlign: "center",
							}}
							variant="subtitle1"
						>
							{tasks.length > 0 ? (
								<>
									{new Date(tasks[0].date).toLocaleDateString("ja-JP", {
										month: "numeric",
										day: "numeric",
										weekday: "short",
									})}
									&nbsp;~&nbsp;
									{new Date(tasks[6].date).toLocaleDateString("ja-JP", {
										month: "numeric",
										day: "numeric",
										weekday: "short",
									})}
								</>
							) : (
								"データ読み込み中..."
							)}
						</Typography>

						<IconButton
							aria-label="delete"
							size="large"
							onClick={getNextWeekTasks}
						>
							<ArrowForwardIosIcon fontSize="inherit" />
						</IconButton>
					</Box>
					<Typography
						variant="subtitle1"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{tasks.length > 0
							? new Date(tasks[0].date).toLocaleDateString("ja-JP", {
									year: "numeric",
								})
							: ""}
					</Typography>
				</Box>
			</TabContext>

			<Footer />
		</>
	);
};

export default Task;

import {
	Box,
	Button,
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
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";

import WeekTask from "./WeekTask";
import { TabList } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



const Task = () => {
	const [value, setValue] = useState<string>("1");
	const [open, setOpen] = useState<boolean>(false);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		event;
	};

	const handleOpenModal = () => {
		setOpen(true);
	};
	const handleCloseModal = () => {
		setOpen(false);
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

			<TabContext value={value}>
				<Box
					sx={{ overflow: "scroll", paddingTop: "80px", paddingBottom: "80px" }}
				>
					<TabList onChange={handleChange} centered>
						<Tab label="全体タスク" value="1" />
						<Tab label="請負中のタスク" value="2" />
						<Tab label="依頼したタスク" value="3" />
					</TabList>

					<TabPanel value="1" sx={{ padding: 0 }}>
						<WeekTask />
					</TabPanel>
					<TabPanel value="2" sx={{ padding: 0 }}>
						<WeekTask />
					</TabPanel>

					<TabPanel value="3" sx={{ padding: 0 }}>
						<WeekTask />
					</TabPanel>

					<Fab
						color="primary"
						aria-label="add"
						sx={{
							position: "fixed",
							bottom: 100,
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

								<FormControl component="form" variant="standard">
									<TextField
										id="outline-disabled"
										label="タスク名"
										defaultValue="コーヒー買ってくる"
										style={{ width: 280, marginBottom: 50 }}
									/>
									<TextField
										id="outlined-multiline-static"
										label="タスク詳細"
										multiline
										rows={8}
										defaultValue="スーパーでコーヒを買ってきてください。豆ではなく、挽いてあるやつでお願いします。"
									/>

									<Box sx={{ display: "flex", alignItems: "center" }}>
										<Button
											variant="contained"
											component="label"
											sx={{ marginLeft: 1 }}
										>
											選択
											<input type="file" capture="user" hidden />
										</Button>
									</Box>

									<Typography sx={{ marginTop: 2 }}>期限指定</Typography>

									<TextField id="inputDate" type="date" />
									<TextField
										id="time"
										type="time" 
										defaultValue="12:00" 
									/>

									<Button variant="contained" sx={{ height: 40, marginTop: 2 }}>
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
						<IconButton aria-label="delete" size="large">
							<ArrowBackIosNewIcon fontSize="inherit" />
						</IconButton>
           
						<Typography
							sx={{ marginRight: "20px", marginLeft: "20px" }}
							variant="subtitle1"
						>
							1/12（土）&nbsp;~&nbsp;1/18（日）
						</Typography>
						<IconButton aria-label="delete" size="large">
							<ArrowForwardIosIcon fontSize="inherit" />
						</IconButton>
					</Box>
          <Typography
							variant="subtitle1"
              sx={{display:'flex',alignItems:'center',justifyContent:'center'}}
						>
							2025年
						</Typography>
					
				</Box>
			</TabContext>

			<Footer />
		</>
	);
};

export default Task;

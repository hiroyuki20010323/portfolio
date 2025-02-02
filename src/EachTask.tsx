import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	Typography,
} from "@mui/material";
import { useState } from "react";

const tasks = [
	{
		id: 1,
		taskName: "コーヒー",
		taskDetails: {
			description:
				"スーパーでコーヒを買ってきてください。豆ではなく、挽いてあるやつでお願いします。",
			dueDate: "2024/11/30 12:00",
		},
	},

	{
		id: 2,
		taskName: "歯磨き粉",
		taskDetails: {
			description: "クリニカでお願いします。",
			dueDate: "2024/11/30 12:00",
		},
	},

	{
		id: 3,
		taskName: "目薬",
		taskDetails: {
			description: "サンテメディカルプラスの赤いやつお願いします。",
			dueDate: "2024/11/30 12:00",
		},
	},

	{
		id: 4,
		taskName: "チョコレート",
		taskDetails: {
			description: "なるべくカカオの配合が高いものを買ってきてください",
			dueDate: "2024/11/30 12:00",
		},
	},
];

type TaskStyle = {
	id: number;
	taskName: string;
	taskDetails: {
		description: string;
		dueDate: string;
	};
};

const EachTask = () => {
	const [open, setOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<TaskStyle | null>(null);

	const handleOpen = (task: TaskStyle) => {
		setSelectedTask(task);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedTask(null);
	};

	return (
		<>
			{tasks.map((task) => {
				return (
					<Box key={task.id}>
						<Paper
							elevation={0}
							onClick={() => handleOpen(task)}
							variant="outlined"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								border: "1px solid  #E0E0E0",
								padding: 3,
								borderRadius: "4px",
							}}
						>
							<Avatar />
							<Typography>{task.taskName}</Typography>
						</Paper>

						{selectedTask && (
							<Dialog
								open={open}
								onClose={handleClose}
								PaperProps={{
									sx: {
										padding: "20px",
										borderRadius: "8px",
										width: "400px",
										height: "300px",
									},
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<DialogTitle sx={{ marginRight: 4 }}>
										{selectedTask.taskName}
									</DialogTitle>
									<Avatar />
								</Box>
								<DialogContent>
									<Typography>
										{selectedTask.taskDetails.description}
									</Typography>
									<Typography sx={{ marginTop: 2 }}>
										期限：{selectedTask.taskDetails.dueDate}
									</Typography>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleClose}>閉じる</Button>
								</DialogActions>
							</Dialog>
						)}
					</Box>
				);
			})}
		</>
	);
};

export default EachTask;

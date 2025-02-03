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
import { Task } from "./Task";


type TaskItems ={
	taskItems:Task[]
}

const EachTask:React.FC<TaskItems> = ({taskItems}) => {
	const [open, setOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const handleOpen = (task: Task) => {
		setSelectedTask(task);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedTask(null);
	};

	return (
		<>
			{taskItems.map((task) => {
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
							<Typography>{task.taskTitle}</Typography>
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
										{selectedTask.taskTitle}
									</DialogTitle>
									<Avatar />
								</Box>
								<DialogContent>
									<Typography>
										{selectedTask.taskDetail}
									</Typography>
									<Typography sx={{ marginTop: 2 }}>
									期限：{new Date(selectedTask.period).toLocaleString('ja-JP', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}
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

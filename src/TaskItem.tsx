import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Badge,
	Box,
	Typography,
} from "@mui/material";

import EachTask from "./EachTask";
import { TaskData } from "./Task";

type TaskItemProps = {
	tasks: TaskData[];
};

const TaskItem: React.FC<TaskItemProps> = ({ tasks }) => {
	return (
		<>
			{tasks.map((task) => (
				<Accordion
					key={task.id}
					sx={{ minHeight: 84, border: "none", boxShadow: "none" }}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								width: "100%",
							}}
						>
							<Typography variant="h6">
								{" "}
								{new Date(task.date).toLocaleDateString("ja-JP", {
									month: "numeric",
									day: "numeric",
									weekday: "short",
								})}
							</Typography>
							<Badge
								badgeContent={4}
								color="success"
								sx={{ marginRight: 4 }}
							></Badge>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<EachTask />
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

export default TaskItem;

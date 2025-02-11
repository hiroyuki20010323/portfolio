import { Box } from "@mui/material"
import Header from "../../../components/Header"
import NotificationItem from "./NotificationItem"
import Footer from "../../../components/Footer"

const Notification = () => {
	return (
		<Box>
			<Header />
			<Box sx={{ paddingTop: "80px", paddingBottom: "80px" }}>
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
				<NotificationItem />
			</Box>
			<Footer />
		</Box>
	)
}

export default Notification

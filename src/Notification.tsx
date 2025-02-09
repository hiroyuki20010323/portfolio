import { Box } from "@mui/material"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NotificationItem from "./NotificationItem"

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

import { AppBar, Avatar, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
	const [pathName, setPathName] = useState(location.pathname)
	useEffect(() => {
		setPathName(location.pathname)
	}, [location.pathname])
	return (
		<>
			{/* TODO:原始的な方法でアイコンの位置などを調整しているので後で修正する */}
			<AppBar
				elevation={0}
				sx={{
					width: "100vw",
					top: 0,
					height: "74px",
					backgroundColor: "white",
					borderBottom: "solid 2px #E0E0E0",
					position: "fixed"
				}}
			>
				<Toolbar
					sx={{
						marginTop: 2,
						display: "flex",
						alignItems: "center",
						position: "relative"
					}}
				>
					<Typography
						variant="h6"
						component="div"
						color="black"
						sx={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)"
						}}
					>
						{pathName === "/"
							? "グループ一覧"
							: pathName === "/creategroup"
								? "グループ作成"
								: pathName === "/task"
									? "タスク一覧"
									: pathName === "/notification"
										? "通知"
										: pathName === "/profile"
											? "プロフィール"
											: pathName === "/groupsettings"
												? "グループ"
												: pathName === "/invitation"
													? "招待リンク"
													: ""}
					</Typography>
					<Avatar
						component={Link}
						to="/groupsettings"
						sx={{ position: "absolute", right: "28px" }}
					/>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Header

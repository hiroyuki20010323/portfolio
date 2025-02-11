import { AuthProvider } from "./provider/AuthProvider"
import AppRoutes from "./routes/AppRoutes"

const App = () => {
	return (
		<>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</>
	)
}

export default App

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setUser(user);
			}
		});

		return () => {
			unsubscribed();
		};
	}, []);

	// TODO あとでちゃんとしたローディング画面を作る。

	return (
		<AuthContext.Provider value={user}>{children}</AuthContext.Provider>
		// TODO　あとで確認する
	);
};

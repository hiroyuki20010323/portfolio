import { signOut } from 'firebase/auth'
import {  useNavigate } from "react-router-dom";
import { auth } from './firebaseConfig';
import { useAuthContext } from './AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth);
    navigate("/login");
  }
const user = useAuthContext();
// console.log(user)
 if(!user){
navigate('/login')
return null;
// リアクトコンポーネントは必ず何か返却する必要があるため、nullを返却する・
  }else{
    return (
      <>
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
         
      </div>
      </>
    )
  }
}

export default Home

import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { SignUp } from './auth/signUp'
import Home from './Home'
import Login from './auth/Login'
import './style.css';
import Profile from './components/profile'
import CreateGroup from './CreateGroup'
import Notification from './Notification'


const App = () => {
  return (
    <AuthProvider>
      <Routes>
   <Route path='/' element={<Home/>}/> 
   <Route path='/signup' element={<SignUp/>}/> 
   <Route path='/login' element={<Login/>}/> 
   <Route path='/profile' element={<Profile/>}/>
   <Route path='/creategroup' element={<CreateGroup/>}/>
   <Route path='/notification' element={<Notification/>}/>
      </Routes>
     </AuthProvider>
  )
}

export default App
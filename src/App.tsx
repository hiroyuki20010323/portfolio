
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { SignUp } from './auth/signUp'
import Home from './Home'
import Login from './auth/Login'
import './style.css';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
   <Route path='/' element={<Home/>}/> 
   <Route path='/signup' element={<SignUp/>}/> 
   <Route path='/login' element={<Login/>}/> 

      </Routes>
     </AuthProvider>
  )
}

export default App
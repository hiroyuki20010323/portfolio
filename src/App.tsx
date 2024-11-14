
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import { SignUp } from './signUp'
import Home from './Home'
import Login from './Login'

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
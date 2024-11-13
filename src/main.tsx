import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { SignUp } from './signUp.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
   <SignUp/>
  </StrictMode>,
)

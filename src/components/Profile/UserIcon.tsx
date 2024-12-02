

import { Avatar, Box } from '@mui/material';
import { useRef, useState } from 'react';

const UserIcon = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [icon ,setIcon] = useState<string | null  >(null)

  const handleInput = () =>{
  const files = fileInputRef.current?.files
  if(!files) return
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) =>{
    setIcon(String(e.target?.result))
  }

  }

  const fileUpLoad =() =>{
    fileInputRef.current?.click()
  }
 
  return (
  <Box >
  <Avatar sx={{width:140,height:140,marginTop:10,marginBottom:10}}
  src={icon|| undefined}
  onClick={fileUpLoad}
  />
  <input type="file" 
  ref={fileInputRef}
  onChange={handleInput}
  style={{   
    display:'none'
    }}/>
  </Box>
  )
}

export default UserIcon
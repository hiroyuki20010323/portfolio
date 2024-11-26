import { Avatar, Box, Button, FormControl, TextField } from '@mui/material'

import Header from './components/Header'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'

const CreateGroup = () => {
  
  return (
    <>
    
    <Header />
    <Box sx={{display:'flex',alignItems:'center',flexFlow:'column',paddingTop:'80px',paddingBottom:'80px'}}>
    <Avatar sx={{width:140,height:140,marginTop:4,marginBottom:4}}/>
    <FormControl component='form' variant='standard' >
      {/* <InputLabel>グループネーム</InputLabel> */}
      <TextField  id='outline-disabled' label='グループネーム'defaultValue='Ishiyama Family' style={{width:280,marginBottom:50}}/>

      <TextField
      id='outlined-multiline-static'
      label='グループ説明'
      multiline
      rows={8}
      defaultValue='グループの説明を書く'
      />
      <Button variant='contained'sx={{height:40,marginTop:10,marginBottom:8}} disabled>保存</Button>
      
    </FormControl>
    </Box>
    <Footer/>
    </>
  )
}

export default CreateGroup
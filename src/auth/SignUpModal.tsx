import { Box, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

type ModalControl ={
  setIsOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

const SignUpModal = ({setIsOpenModal}:ModalControl) => {
const{control,handleSubmit} = useForm({mode:'onSubmit',defaultValues:{
  user_name:''
}})

const  navigate = useNavigate();



  const [open, setOpen] = useState(true);
  const onSubmit = () =>{
    setIsOpenModal(false);
    navigate('/')
    console.log('発火してるで')
   
  }
  return (
    <Box>
      <Modal
        open={open}
        onClose={()=>{}}
        disableEscapeKeyDown
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', 
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    }} >
            <FormControl component='form' variant='standard' onSubmit={handleSubmit(onSubmit)}>
          <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{mb:4}}>
            ユーザーネームを設定してください！！
            </Typography>
        <TextField id='outline-disabled' name='user_name' label='ユーザーネーム' sx={{width:300,mt:4,mb:6}}/>
        <Button variant='contained' type='submit'>送信</Button>

            </FormControl>
       
        </Box>
      </Modal>
 
    </Box>
  );
}



export default SignUpModal
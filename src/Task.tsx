import {  Box, Fab, Modal, Tab, Typography} from '@mui/material'

import Header from './components/Header'
import Footer from './components/Footer'

import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext';

import WeekTask from './WeekTask';
import { TabList } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';


const Task = () => {
  const [value, setValue] = useState<string>('1');
  const [open,setOpen] = useState<boolean>(false)

const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  setValue(newValue);
};

const handleOpenModal = ()=>{
  setOpen(true);
}
const handleCloseModal =()=>{
  setOpen(false)
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  return (
   <>
<Header />



<TabContext value={value}>

<Box sx={{overflow:'scroll',paddingTop:'80px',paddingBottom:'80px'}}>
 
   
    <TabList  onChange={handleChange} centered>
      <Tab label="全体タスク" value="1"  />
      <Tab label="請負中のタスク" value="2"  />
      <Tab label="依頼したタスク" value="3" />
    </TabList>
  


  <TabPanel value="1" sx={{padding:0}}>
  <WeekTask/>
  </TabPanel>
  <TabPanel value="2"sx={{padding:0}}>
  <WeekTask/>
  
  </TabPanel>
 
  <TabPanel value="3"sx={{padding:0}}>
<WeekTask/>

  </TabPanel>

  <Fab color="primary" aria-label="add"  sx={{
    position: 'fixed',
    bottom: 100,
    right: 16,
  }}
  onClick={handleOpenModal} >
  <AddIcon />
 
</Fab>
<Modal
// openプロパティがtrueの時にモーダル表示、falseの時にモーダル閉じる
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>


  </Box>

</TabContext>

<Footer/>
   </>
 
  )
}

export default Task
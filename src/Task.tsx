import {  Box, Tab} from '@mui/material'

import Header from './components/Header'
import Footer from './components/Footer'

import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react'
import TabContext from '@mui/lab/TabContext';

import WeekTask from './WeekTask';
import { TabList } from '@mui/lab';


const Task = () => {
  const [value, setValue] = useState('1');

const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  setValue(newValue);
};
  return (
   <>
<Header />
<TabContext value={value}>

<Box sx={{overflow:'scroll',paddingTop:'80px',paddingBottom:'80px'}}>
  <Box sx={{ width: '100%' }}>
   
    <TabList  onChange={handleChange} centered>
      <Tab label="全体タスク" value="1"  />
      <Tab label="請負中のタスク" value="2"  />
      <Tab label="依頼したタスク" value="3" />
    </TabList>
  </Box>


  <TabPanel value="1" >
  <WeekTask/>
  </TabPanel>
  <TabPanel value="2">
  <WeekTask/>
  ページ２
  </TabPanel>
 
  <TabPanel value="3">
<WeekTask/>
ページ３
  </TabPanel>
  </Box>

</TabContext>
<Footer/>
   </>
 
  )
}

export default Task
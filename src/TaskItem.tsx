

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Box,  Typography,  } from '@mui/material'
import React from 'react'
import EachTask from './EachTask';

const TaskItem = () => {
  return (
  

 
    <Accordion sx={{minHeight:90}}>
    <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header">
          <Box sx={{display:'flex' ,justifyContent:'space-between',alignItems:'center',width:'100%'}}>
    <Typography variant='h6'>12/1(月)</Typography>
    <Badge badgeContent={4}color='success'  sx={{marginRight:4}}>
      </Badge>
          </Box>
    </AccordionSummary>
    <AccordionDetails >
<EachTask/>
<EachTask/>
<EachTask/>
<EachTask/>
    </AccordionDetails>
        </Accordion>
      
  )
}

export default TaskItem
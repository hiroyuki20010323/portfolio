import { Avatar, Button, List, ListItem,  Typography } from '@mui/material'


const GroupListItem = () => {
  return (
    <List sx={{display:'flex',border:'solid 2px  #E0E0E0',padding:'20px',borderTop:'none',alignItems:'center',overflow:'scroll'}}>
      <Avatar sx={{marginTop:'3px',marginRight:'10px',sizes:'md'}}/>
      <ListItem sx={{display:'flex',flexFlow:'column',alignItems:'flex-start'}}>
      <Typography variant='subtitle1'>
        グループ１
        </Typography>
        <Typography variant='caption'>
        メンバー: 5
        </Typography>
      </ListItem>
      <Button variant='contained'  sx={{marginLeft:10,height:30}}>開く</Button>
    </List>
  )
}

export default GroupListItem
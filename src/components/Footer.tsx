import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import  { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link  } from 'react-router-dom';


const Footer = () => {
  const [value ,setValue] = useState(0);
  return (
    <>
     <Paper sx={{ width:'100vw',position:'sticky', bottom: 0, left: 0, right: 0, padding:2,borderTop:'solid 2px #E0E0E0',marginTop:2}} elevation={0} >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
      

        <BottomNavigationAction label="グループ"value='/' icon={<GroupsIcon />} component={Link} to='/'/>
        <BottomNavigationAction label="新規作成" value='/creategroup'icon={<AddCircleOutlineIcon />}component={Link} to='/creategroup' />
        <BottomNavigationAction label="通知"value='/notification' icon={<NotificationsIcon />} component={Link} to='/notification'/>
        <BottomNavigationAction label="ユーザー"value='/profile' icon={<Avatar sizes='sm' />} component={Link} to='/profile' />
        
      </BottomNavigation>
      </Paper>
    </>
  )
}

export default Footer
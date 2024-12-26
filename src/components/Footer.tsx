import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import  { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link  } from 'react-router-dom';


const Footer = () => {
  const [value ] = useState(0);
  // 上記もbuildのため、一時的にset関数を消した
  return (
    <>
     <Paper sx={{ width:'100vw',position:'fixed', bottom: 0, left: 0, right: 0, padding:2,borderTop:'solid 2px #E0E0E0',marginTop:2,height:'80px',zIndex:99}} elevation={0} >
      <BottomNavigation
        value={value}
        // onChange={(event, newValue) => {
        // }}
        // 上記もbuild
      >
      

        <BottomNavigationAction label="グループ"value='/' icon={<GroupsIcon />} component={Link} to='/'/>
        <BottomNavigationAction label="新規作成" value='/creategroup'icon={<AddCircleOutlineIcon />}component={Link} to='/creategroup' />
        <BottomNavigationAction label="タスク"value='/task' icon={<ListAltIcon/>} component={Link} to='/task' />
        <BottomNavigationAction label="通知"value='/notification' icon={<NotificationsIcon />} component={Link} to='/notification'/>
        <BottomNavigationAction label="ユーザー"value='/profile' icon={<Avatar sizes='sm' />} component={Link} to='/profile' />
        
      </BottomNavigation>
      </Paper>
    </>
  )
}

export default Footer
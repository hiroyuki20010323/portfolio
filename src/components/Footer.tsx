import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React, { useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Footer = () => {
  const [value ,setValue] = useState(0);
  return (
    <>
     <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,padding:'10px',borderTop:'solid 2px #E0E0E0'}} elevation={0} >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="グループ"value='グループ' icon={<GroupsIcon />} />
        <BottomNavigationAction label="新規作成" value='新規作成'icon={<AddCircleOutlineIcon />} />
        <BottomNavigationAction label="通知"value='通知' icon={<NotificationsIcon />} />
        <BottomNavigationAction label="ユーザー"value='ユーザー' icon={<Avatar sizes='sm' />} />
      </BottomNavigation>
      </Paper>
    </>
  )
}

export default Footer
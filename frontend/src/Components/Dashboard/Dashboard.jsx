import * as React from 'react';

import {useState, useEffect} from "react";
import {Redirect, Link} from "react-router-dom";




import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




//Importing all the Management pagemeasuring


import {User} from "./UserMangement/User"
import {Role} from "./RoleManagement/Role";
import {Permission} from "./PermissionManagement/Permission";
import {Project} from "./ProjectManagement/Project";


import "./Dashboard.css";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const [isAuth, setIsAuth] = useState(false);

  ///Outout functionality

  const handleLogout = () => {
    sessionStorage.removeItem("userid");
    setIsAuth(true);
  }

 

  //All management condition for showing the whole data.. 


  const [userManagement, setUserManagement] = useState(false);
  const [permissionManagement, setPermissionManagement] = useState(false);
  const [roleManagement, setRoleManagement] = useState(false);
  const [projectManagement, setProjectManagement] = useState(false);



  //Handle click Dashboard management


  const dashboardClick = () => {
    setUserManagement(false);
    setPermissionManagement(false);
    setRoleManagement(false);
    setProjectManagement(false);
  }

  //Handle click user Management


  const handleClickUserManagement = () => {
    setUserManagement(true);
    setPermissionManagement(false);
    setRoleManagement(false);
    setProjectManagement(false);

  }



  //Handle click role management

  const handleClickRoleManagement = () => {
    setUserManagement(false);
    setPermissionManagement(false);
    setRoleManagement(true);
    setProjectManagement(false);
  }




  //Handle click permission management

  const handleClickPermissionManagement = () => {
    setUserManagement(false);
    setPermissionManagement(true);
    setRoleManagement(false);
    setProjectManagement(false);
  }



  //Handle Click Project management

  const handleClickProjectManagement = () => {
    setUserManagement(false);
    setPermissionManagement(false);
    setRoleManagement(false);
    setProjectManagement(true);
  }

  if(isAuth) {
    return <Redirect to = "/" />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Button  onClick = {dashboardClick} variant="h6" noWrap component="div">
            Dashboard
          </Button>
          <div className = "logout">
          <Button onClick = {handleLogout} sx={{ ml: 3 }} component = "div" variant = "h6">Logout</Button>
          </div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

        <ListItem onClick = {handleClickUserManagement} button key="User Management">
              
              <ListItemText primary="User Management" />
              
            </ListItem>
            <Divider />
            <ListItem onClick = {handleClickRoleManagement} button key="Role Management">
              
              <ListItemText primary="Role Management" />
              
            </ListItem>
            <Divider />
            <ListItem onClick = {handleClickPermissionManagement} button key="PerMission Management">
              
              <ListItemText primary="Permission Management" />
              
            </ListItem>
            <Divider />
            <ListItem onClick = {handleClickProjectManagement} button key="Project Management">
              
              <ListItemText primary="Project Management" />
              
            </ListItem>
            <Divider />

        </List>
               
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {
          ((userManagement === true) && (permissionManagement === false) && (roleManagement === false) && (projectManagement === false)) ? (
            <User />
          ) : ("")
        }



        {
          ((userManagement === false) && (permissionManagement === false) && (roleManagement === true) && (projectManagement === false)) ? (
            <Role />
          ) : ("")
        }



        {
          ((userManagement === false) && (permissionManagement === true) && (roleManagement === false) && (projectManagement === false)) ? (
            <Permission />
          ) : ("")
        }


        {
          ((userManagement === false) && (permissionManagement === false) && (roleManagement === false) && (projectManagement === true)) ? (
            <Project />
          ) : ("")
        }


          {
          ((userManagement === false) && (permissionManagement === false) && (roleManagement === false) && (projectManagement === false)) ? (
           <div>
              <Typography variant = "h2" paragraph>
              Welcome to the Dashboard
            </Typography>
            
        </div>
          ) : ("")
        }

        
      </Main>
    </Box>
  );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const Nav = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem("formtoken")
  const username = localStorage.getItem("adminName")
  console.log(token);

  const logout = ()=>{
    handleClose()
    localStorage.removeItem("formtoken")
    localStorage.removeItem("adminName")
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      
      <AppBar position="static" >
        <Toolbar className="bg-cyan-600">
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="cursor-pointer" onClick={()=>Nav('/')}>
            Form Builder
          </Typography>
          {auth && (
            <div>
              {
                token ? 
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              :<h1 className="cursor-pointer" onClick={()=> Nav('/login')}>Sign In</h1>
              }
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{username}</MenuItem>
                <MenuItem onClick={()=>{
                    handleClose()
                    Nav('/admin')
                }}>Admin Panel</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
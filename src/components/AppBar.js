import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleNavigate = route => {
        navigate(route)
  }

  return (
    <div>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={()=>handleNavigate('/calendar')}>Malmö/Lund</MenuItem>
      <MenuItem onClick={()=>handleNavigate('/hbg')}>Helsingborg</MenuItem>
      <MenuItem onClick={()=>handleNavigate('/dk')}>Denmark</MenuItem>
    </Menu>

    <Box sx={{ flexGrow: 2}}>
      <AppBar position="static" sx={{color:'#FFFFB7',  backgroundColor:'#232323'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <HomeIcon 
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={()=>handleNavigate('/home')}
            />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}  onClick={()=>handleNavigate('/home')}>
            (Note: Use tangosweden.se until we have redirected to the .com address)
          </Typography>
          <Typography variant="h9" component="div" sx={{ flexGrow: 4 }}  onClick={()=>handleNavigate('/home')}>
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <MenuIcon 
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}

/*
*/
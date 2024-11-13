"use client"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = ['Home', 'Events', 'Officers', 'About', 'Contact',];

  return (
    <AppBar position="absolute"
    sx={{
      backgroundColor: '#B22222',  // Customize background color
      color: '#ffffff',            // Customize text color
    }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Site Name */}
        <Box display="flex" alignItems="center">
          <img src="https://github.com/njdicristo/UW-Curling-Website/blob/main/curlingbucky-ai-brush-removebg-9co1clup.png?raw=true" alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" component="div">
            Curling Club of UW-Madison
          </Typography>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((text) => (
            <Button key={text} color="inherit">{text}</Button>
          ))}
          <IconButton color="inherit" href="https://instagram.com/curlinguw" target="blank__">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" href="https://account.venmo.com/u/uwcurling" target="blank__">
          <VolunteerActivismIcon/>
          </IconButton>
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((text) => (
              <ListItemButton key={text}>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
            <ListItemButton component="a" href="https://instagram.com/curlinguw" target="blank__">
              <InstagramIcon />
            
            </ListItemButton>
            <ListItemButton component="a" href="https://account.venmo.com/u/uwcurling" target="blank__">
              <VolunteerActivismIcon/>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ height: '3px', backgroundColor: '#9E1C1C' }} />
    </AppBar>
    
  );
}

export default Navbar;

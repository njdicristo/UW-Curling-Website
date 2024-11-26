"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import { Drawer, List, ListItemButton, ListItemText, Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { Box } from "@mui/system";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Bucky from "../components/curlingbucky.png";

function Navbar() {
  const { data: session } = useSession();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Officers", path: "/officers" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#B22222",
        color: "#ffffff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap", // Prevent flexing
        }}
      >
        {/* Logo and Site Name */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            minWidth: "300px", // Set a minimum width to prevent flexing
            flex: "0 0 auto", // Prevent resizing
            mr: '5px'
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center" }}>
            <Image
              src={Bucky}
              alt="Logo"
              height={50}
              width={50}
              style={{ marginRight: 10 }}
            />
            <Typography variant="h6" component="div" sx={{ fontFamily: "Inter, Arial, sans-serif" }}>
              Curling Club of UW-Madison
            </Typography>
          </Link>
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navLinks.map(({ label, path }) => (
            <Link key={label} href={path} passHref>
              <Button color="inherit" sx={{ color: "white", mt: 0.25 }}>
                {label}
              </Button>
            </Link>
          ))}
          <IconButton color="inherit" href="https://instagram.com/curlinguw" target="blank__">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" href="https://account.venmo.com/u/uwcurling" target="blank__">
            <VolunteerActivismIcon />
          </IconButton>
          {session && (
            <IconButton
              onClick={handleAvatarClick}
              sx={{ ml: 1.5, mr: '2'}}
            >
              <Avatar alt={session.user?.name || "User"} src={session.user?.name || ""} />
            </IconButton>
          )}
          {!session && (
            <Button color="inherit" onClick={() => signIn()} sx={{ ml: 2 }}>
              Sign In
            </Button>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Menu */}
    {/* Drawer for Mobile Menu */}
{/* Drawer for Mobile Menu */}
<Drawer
  anchor="top"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  ModalProps={{
    disableScrollLock: true, // Prevents scroll locking
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyItems: "center",
      flexDirection: "column",
      alignItems: "center", // Centers content horizontally
      paddingTop: 2, // Adds space at the top
      textAlign: "center",
      backgroundColor: "#ffffff", // Optional: background color for clarity
      width: "100%", // Ensures it spans the drawer width
    }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    {session ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Avatar
          alt={session.user?.name || "User"}
          src={session.user?.name || ""}
          sx={{ marginRight: 1 }}
        />
        <Typography>{session.user?.name || "User"}</Typography>
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Button
          color="inherit"
          onClick={() => signIn()}
          sx={{ color: "#B22222", textTransform: "none", display: "flex",
            alignItems: "center",}}
        >
          Sign In
        </Button>
      </Box>
    )}
    <Divider sx={{ width: "90%", marginBottom: 1 }} />
    <List sx={{
 display: "flex",
      justifyItems: "center",
      flexDirection: "column",
      alignItems: "center", // Centers content horizontally
      paddingTop: 2, // Adds space at the top
      textAlign: "center",


    }}>
      {navLinks.map(({ label, path }) => (
        <Link key={label} href={path} passHref>
          <ListItemButton
            component="a"
            sx={{
              justifyContent: "center", // Center items within the button
              color: "black",
              textDecoration: "none",
              textTransform: "none",
            }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        </Link>
      ))}
      <ListItemButton
        component="a"
        href="https://instagram.com/curlinguw"
        target="blank__"
        sx={{ justifyContent: "center" }}
      >
        <InstagramIcon />
      </ListItemButton>
      <ListItemButton
        component="a"
        href="https://account.venmo.com/u/uwcurling"
        target="blank__"
        sx={{ justifyContent: "center" }}
      >
        <VolunteerActivismIcon />
      </ListItemButton>
    </List>
    {session && (
      <Box sx={{ marginTop: 0.5, marginBottom: 0.5 }}>
        <Divider />
        <Button
          color="inherit"
          onClick={() => signOut()}
          sx={{ color: "#B22222" }}
        >
          Sign Out
        </Button>
      </Box>
    )}
  </Box>
</Drawer>

      {/* Profile Menu */}
      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
  anchorOrigin={{ vertical: "center", horizontal: "center" }}
  transformOrigin={{ vertical: "center", horizontal: "center" }}
  disableScrollLock={true} // Add this line to prevent scroll locking
>
  <MenuItem onClick={() => { handleClose(); signOut(); }}>Sign Out</MenuItem>
</Menu>


      <Box sx={{ height: "3px", backgroundColor: "#9E1C1C" }} />
    </AppBar>
  );
}

export default Navbar;

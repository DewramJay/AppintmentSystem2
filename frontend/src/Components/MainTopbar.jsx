import { AppBar, Avatar, Box, Button, Chip,  Divider,  Fade,  InputBase,  Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from "react";


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 75,
  //backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg)',
  backgroundSize: 'cover',
  //filter: 'grayscale(100%)', // Convert image to grayscale
  border: '2px solid white', // Add a border to create a separation effect
  borderRadius:'25px',
}));

const useStyles = styled((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function MainTopbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser.User);
      // console.log(user);
    }
    
    
  }, []);

  //clear localstorage
  const clearLocalStorage = () => {
    localStorage.clear();
    //console.log('LocalStorage data cleared.');
    window.location = "/grp19/login";
  };

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user == null) {
    return <div>Loading</div>
  }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor:'#198897'}}>
          <Toolbar>
          <Stack direction = {'row'} flexGrow = {1} alignItems="center" justifyContent="flex-start" spacing={1}>
            <StyledAvatar src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"  sx={{ width: 56, height: 75 }} variant="square"/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"revert-layer" }}>
               
                <a href="/HomeStudent">
                    <Button variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"revert-layer",color:"white" ,fontSize:"20px"}} >
                      UNIVERSITY OF RUHUNA
                    </Button>
                  </a>
                </Typography>

                <Stack direction="row" spacing={2}>
                {/* <Search flexGrow = {10}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search> */}
                
                    <div>
                    <Button  onClick={handleClick}>
                    <Chip
                        sx={{ backgroundColor: '#C5ECF1' }}
                        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                        label={
                            <Stack direction="row" spacing={1} alignItems="center">
                            {user.fullName}
                            <ArrowDropDownIcon />
                            </Stack>
                        }
                        />
                    
                    </Button>
                    <Menu
                        className={classes.root}
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <a href="/grp19/saccountpage"><MenuItem onClick={handleClose}>Profile</MenuItem></a>
                        <Divider />
                        {/* <a href="/AddStudent"><MenuItem onClick={handleClose}>Settings</MenuItem></a>
                        <Divider /> */}
                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        <MenuItem onClick={clearLocalStorage}>Logout</MenuItem>
                    </Menu>
                    </div>

                </Stack>
                
          </Stack> 
         </Toolbar>
        </AppBar>
      </Box>
    );
  }


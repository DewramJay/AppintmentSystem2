import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Box, Button, Card, CardActions,alpha,MenuItem,Chip,Avatar, Menu, Fade, Divider, CardContent, CardMedia, CssBaseline, Stack, Toolbar, Typography } from "@mui/material";
import SideDrawer from "../Components/SideDrawer";
import { Grid, styled,InputBase } from '@mui/material';
import LectureAccStudentViewTopbar from "../Components/LectureAccStudentViewTopbar";
import LectureImg from '../Images/LectureImg.jpg';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { apiUrl } from "../config";

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */

const useStyles = styled((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 75,
  //backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg)',
  backgroundSize: 'cover',
  //filter: 'grayscale(100%)', // Convert image to grayscale
  border: '2px solid white', // Add a border to create a separation effect
  borderRadius:'25px',
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

           


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */

export default function HomeStudent () {
/* */
const classes = useStyles();
const [searchQuery, setSearchQuery] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
/**/
//getting data from backend
const [lec, setLec] = useState([]);

useEffect(() => {
    function getUsers() {
      axios
        .get(apiUrl + "/api/users/")
        .then((res) => {
          setLec(res.data);
        })

        .catch((err) => {
          alert(err.message);
        });
    }
    getUsers();
  }, []);

  //get user
  const [user, setUser] = useState([]);
  
  function getLec(data) {
    axios
    .get(apiUrl +`/api/users/getOne/${data}`)
    .then((res) => {
      setUser(res.data);
      localStorage.setItem('Lec', JSON.stringify(res.data));

      window.location = "/LAccountPage";
    })
    .catch((err) => {
      alert(err.message);
    });

  
  }


  const buttonStyle3 = {
   
  
    position: 'absolute',
    width: '246px',
    height: '57px',
    left: '412px',
    top: '550px',
    borderRadius: '50px',
   
  };


    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
 {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */}
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#198897" }}>
        <Toolbar>
          <Stack
            direction={"row"}
            flexGrow={1}
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
          >
            <StyledAvatar
              src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"
              sx={{ width: 56, height: 75 }}
              variant="square"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "revert-layer" }}
            >
              ELECTRICAL AND INFORMATION ENGINEERING
            </Typography>

            <Stack direction="row" spacing={2}>
              <Search flexGrow={10} >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  type="text"
                  placeholder="Search by lecturer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>

              <div>
                <Button onClick={handleClick}>
                  <Chip
                    sx={{ backgroundColor: "#C5ECF1" }}
                    avatar={
                      <Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />
                    }
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
                  <a href="./saccountpage"><MenuItem onClick={handleClose}>Profile</MenuItem></a>
                  <Divider />
                  <a href="./login"><MenuItem onClick={handleClose}>Logout</MenuItem></a>
                </Menu>
              </div>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>

           


{/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */}


      
        </AppBar>
        <SideDrawer/>


        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ flexGrow: 1 }}>
           
            

<Grid container spacing={3}>
{lec
    .filter(item => item.role === "Lecturer" && item.department === "Department of Civil and Environmental Engineering" &&
    item.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()))
    .map(item => (
      <Grid item xs={12} sm={4} md={3} key={item._id}>
        <Card>
        <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={item.userimage} alt="LectureImg" style={{ width: '254px', height: '276px' }} />
        </CardMedia>
          <CardContent>
            <Typography textAlign={'center'}>
              {item.fullName}
            </Typography>
            <Typography textAlign={'center'}>
              {item.email}
            </Typography>
            <Button variant="contained" onClick={() => getLec(item.email)} sx={{ width: '100%', backgroundColor:"#064c8f"}}>
              View Details
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
                
            
            </Box>
        </Box>

        
        </Box>
);
}
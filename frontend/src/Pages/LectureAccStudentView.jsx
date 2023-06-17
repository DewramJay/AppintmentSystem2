import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Stack, Toolbar, Typography } from "@mui/material";
import SideDrawer from "../Components/SideDrawer";
import { Grid } from '@mui/material';
import LectureAccStudentViewTopbar from "../Components/LectureAccStudentViewTopbar";
import LectureImg from '../Images/LectureImg.jpg'



export default function HomeStudent () {

//getting data from backend
const [lec, setLec] = useState([]);

useEffect(() => {
    function getUsers() {
      axios
        .get("http://localhost:8080/api/users/")
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
  const [User, setUser] = useState([]);
  
  function getLec(data) {
    axios
    .get(`http://localhost:8080/api/users/getOne/${data}`)
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
            <LectureAccStudentViewTopbar/>      
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
    .filter(item => item.role === "Lecturer" && item.department === "Department of Electrical and Information Engineering")
    .map(item => (
      <Grid item xs={12} sm={4} md={3} key={item._id}>
        <Card>
        <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={LectureImg} alt="LectureImg" style={{ width: '254px', height: '276px' }} />
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
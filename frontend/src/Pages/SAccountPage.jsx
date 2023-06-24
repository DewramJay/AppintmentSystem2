import { AppBar, Box, Button, CardContent, Chip, CssBaseline, Divider, Grid, List, ListItem, Stack, Toolbar, Typography } from "@mui/material";
import MainTopbar from "../Components/MainTopbar";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { signup, login, logout, useAuth } from "./ImageUpload/firebase";
import Profile from "./ImageUpload/Profile";




export default function SAccountPage () {


  const buttonStyle = {
   
  
    fontsize: '50px',
    margin:' 0px 20px 0px 0px',
   
  };


  
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
      const storedUser = localStorage.getItem('User');
  
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
  
        setUser(parsedUser.User);
      }
      
    }, []);

    if (user == null) {
        return <div>Loading</div>
      }
  
      const isStudent = user && user.role === 'Lecturer';


///////////////////////
async function handleSignup() {
  setLoading(true);
  try {
    await signup(emailRef.current.value, passwordRef.current.value);
  } catch {
    alert("Error!");
  }
  setLoading(false);
}

async function handleLogin() {
  setLoading(true);
  try {
    await login(emailRef.current.value, passwordRef.current.value);
  } catch {
    alert("Error!");
  }
  setLoading(false);
}

async function handleLogout() {
  setLoading(true);
  try {
    await logout();
  } catch {
    alert("Error!");
  }
  setLoading(false);
}


////////////////////////



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <MainTopbar/>      
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Toolbar />
          <Grid container spacing={0}>
            <Grid item xs={4} md={3} sx={{borderRight: 1, borderColor: 'divider'}}>
              <Box p={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '100%', height: 'auto' }}>
                    <Toolbar/>

                    <div id="main">
                      <div>
      
                          <div>Currently logged in as: { currentUser?.email } </div>

                          <div >
                            <p>Edit profile Photo</p>
                          </div>

                          {!currentUser && 
                            <>
                              <div className="fields">
                                <input ref={emailRef} placeholder="Email" />
                                <input ref={passwordRef} type="password" placeholder="Password" />
                              </div>

                              <button disabled={ loading } onClick={handleSignup}>Sign Up</button>
                              <button disabled={ loading } onClick={handleLogin}>Log In</button>
                            </>
                          }

                          {currentUser && 
                            <>
                              <Profile />
                              <button className="buttonstyle" disabled={ loading || !currentUser } onClick={handleLogout}>Remove Profile Photo</button>
                            </>
                          }
                          </div>
                        </div>


                        
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8} md={9}>
              <Box p={2}>
                <CardContent>
                    <Toolbar/>
                <Stack direction="row" spacing={4}>
                <Chip label="Name" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <Chip
                    sx={{ backgroundColor: '#C5ECF1', fontSize: "1.0rem", width: "50%" }}
                    label={
                    <Stack direction="row" spacing={1} >
                        {user.fullName}
                    </Stack>
                    }
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                <Chip label="Registration No." sx={{ fontSize: "1.0rem", width: "25%" }} />
                <Chip
                    sx={{ backgroundColor: '#C5ECF1', fontSize: "1.0rem", width: "50%" }}
                    label={
                    <Stack direction="row" spacing={1} >
                        {user.regNo}
                    </Stack>
                    }
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                <Chip label="Student Mail" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <Chip
                    sx={{ backgroundColor: '#C5ECF1', fontSize: "1.0rem", width: "50%" }}
                    label={
                    <Stack direction="row" spacing={1} >
                        {user.email}
                    </Stack>
                    }
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                <Chip label="Department" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <Chip
                    sx={{ backgroundColor: '#C5ECF1', fontSize: "1.0rem", width:"50%" }}
                    label={
                    <Stack direction="row" spacing={1} >
                        {user.department}
                    </Stack>
                    }
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                <Chip label="Contact No." sx={{ fontSize: "1.0rem", width: "25%" }} />
                <Chip
                    sx={{ backgroundColor: '#C5ECF1', fontSize: "1.0rem", width: "50%" }}
                    label={
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", textAlign: "left" }}>
                        {user.telephoneNo}
                    </Stack>
                    }
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:30}}></Stack>

                {isStudent && (
                <Stack direction='row'  justifyContent='flex-end'  flexGrow={1} sx={{ height: 30 , width: "77%"}}>
                <a href ="/Testing" ><Button variant='contained' sx={{ width: '20%' }}>Schedule</Button></a> 
                </Stack>
                )}

                </CardContent>
              </Box>
            </Grid>
          </Grid>
          
        </Box>
        <Stack direction = {'row'} height={100}></Stack> 
              
              <Divider/>
              
              <Stack direction = {'row'} flexGrow = {1} alignItems="center" justifyContent="flex-start" spacing={30} sx={{ bgcolor:""}}>
              <Typography width={500}>
                  
               The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle.
               Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission
               policy on university admissions.

              </Typography>
              <Typography>
              <List>
                <ListItem variant="h5" gutterBottom>
                DEPARTMENTS
                </ListItem>
                <ListItem>
                Civil and Environmental Engineering
                </ListItem>
                <ListItem>
                Electrical and Information Engineering
                </ListItem>
                <ListItem>
                Mechanical and Manufacturing Engineering
                </ListItem>
                <ListItem>
                Interdisciplinary Studies
                </ListItem>    

              </List>  
              </Typography>
              <Typography>
                  <List>
                  <ListItem variant="h5" gutterBottom>
                  CONTACT US
                  </ListItem>
                  <ListItem>
                  Faculty of Engineering,Hapugala,Galle,Sri Lanka.
                  </ListItem>
                  <ListItem>
                  Phone: +(94)0 91 2245765/6
                  </ListItem>
                  <ListItem>
                  E-mail: webmaster@eng.ruh.ac.lk
                  </ListItem> 
                  </List>  
               </Typography>

              </Stack>

      </Box>
    </Box>
  );
}
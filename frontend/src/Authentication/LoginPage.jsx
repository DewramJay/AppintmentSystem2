import { AppBar, Box, Button, Card, CardActionArea, CardContent, CssBaseline, Divider, List, ListItem, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { CenterHeaderCard } from "../Components/CenterHeaderCard";
import { useState } from "react";
import axios from "axios";

import LoginTopbar from "../Components/LoginTopbar";

import { Link } from 'react-router-dom';

export default function LoginPage () {
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [User, setUser] = useState([]);

    function getUser() {
      axios
      .get(`http://localhost:8080/api/users/getOne/${data.email}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('User', JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err.message);
      });
    



      // axios
      // .get(`http://localhost:8080/api/users/getOne/642694558d8adb45b11abf32`)
      // .then((res) => {
      //   setUser(res.data);
      //   localStorage.setItem('User', JSON.stringify(res.data));
      // })
      // .catch((err) => {
      //   alert(err.message);
      // });
    
      }


  

	const handleChange = ({ currentTarget: input }) => {
        
		setData({ ...data, [input.name]: input.value });
	};



    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
            getUser();
			window.location = "/homestudent";
            
            alert("success");
		} catch (error) {
            alert("error");
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <LoginTopbar/>      
        </AppBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex' }}>
          <CssBaseline />       
            <Toolbar />
            <Box sx={{ flexGrow: 1,maxWidth: 2000, height: 850}} >
           
           <Card sx={{ maxWidth: 2000, height: 850}} >
           <CardActionArea >
          
              <CenterHeaderCard title={"Appointment Management System"} >
                  <Stack sx={{backgroundColor:"#C5ECF1" }} direction = {'row'} height={300} width={500} alignItems={"center"} >
                  <Stack spacing={2} sx={{ width: '450' }} alignItems={"center"} >
                      
                  <TextField
                      type="email"
                      label="Email"
                      name="email"
                      //onChange={(e) => setEmail(e.target.value)}
                      onChange={handleChange}
                      value={data.email}
                      required
                      //className={styles.input}
                  />

                  
                  <TextField
                      type="password"
                      label="Password"
                      name="password"
                     // onChange={(e) => setPassword(e.target.value)}
                      onChange={handleChange}
                      value={data.password}
                      required
                      //className={styles.input}
                  />

                  {error && <div>{error}</div>}

                  <div>
                        <Link to="/AdminLogin"> If you are admin, Click here to log in</Link>
                      </div>

                      <Stack spacing={2} direction="row" sx={{ width: '450' }} alignItems={"center"}>
                          <Button type="submit" variant='contained' onClick={handleSubmit} sx={{ width: 500 , alignItems:"center", backgroundColor:"#46B7C7"}}>Login</Button>
                      </Stack>
                      
                  </Stack>
                  </Stack>
                  <Toolbar/>
                  
          </CenterHeaderCard>
          
              <CardContent>
                  
              <Divider />
              <Stack direction = {'row'} flexGrow = {1} alignItems="center" justifyContent="flex-start" spacing={30}>
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
              </CardContent>
              </CardActionArea>
          </Card>
          
          
    </Box>

          </Box>
        </Box>
        </Box>
    );
  }



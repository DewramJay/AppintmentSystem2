import { AppBar, Box, Button, Card, CardActionArea, CardContent, CssBaseline, Divider, Grid, List, ListItem, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { CenterHeaderCard } from "../Components/CenterHeaderCard";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import LoginTopbar from "../Components/LoginTopbar";
import {apiUrl, comb} from "../config";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // Define the 'user' state



  // const token = localStorage.getItem("token");


  //       if (token) {

  //           return <Navigate to="/login" />;
  //       }




  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = apiUrl +"/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      getUser();
      window.location = comb+"/homestudent";
      alert("success");
    } catch (error) {
      alert("error");
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const getUser = () => {
    axios
      .get(apiUrl +`/api/users/getOne/${data.email}`)
      .then((res) => {
        setUser(res.data);

        let userData = res.data;

        userData.authenticated = true;

        localStorage.setItem('User', JSON.stringify(userData));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <LoginTopbar />
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Toolbar />
          <Box sx={{ flexGrow: 1, maxWidth: 2000, height: 850 }}>
            <Card sx={{ maxWidth: 2000, height: 1100 }}>
              <CardActionArea>
                <CenterHeaderCard title={"Appointment Management System"}>
                  <Stack sx={{ backgroundColor: "#C5ECF1" }} direction='row' height={300} width={500} alignItems='center'>
                    <Stack spacing={2} sx={{ width: '450px' }} alignItems='center'>
                      <TextField 
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                      />
                      <TextField
                        type="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                      />
                      {error && <div>{error}</div>}
                      <div>
                        <Link to="/grp19/AdminLogin"> If you are an admin, click here to log in</Link>
                      </div>
                      <Stack spacing={2} direction="row" sx={{ width: '450px' }} alignItems='center'>
                        <center>
                        <Button type="submit" variant='contained' onClick={handleSubmit} sx={{ width: '500px', backgroundColor: "#46B7C7", marginBottom:1}}>
                          Login
                        </Button>
                        <a href ="/grp19/SignInPage" ><Button type="submit" variant='contained' sx={{ width: '500px', backgroundColor: "#46B7C7" }}>
                          Sign up
                        </Button></a>
                        </center>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Toolbar />
                </CenterHeaderCard>
                <CardContent>
                  <Divider />
                  <Grid container spacing={2} sx={{backgroundColor: "#198897",}}>
                  <Grid item xs={12} md={6}>
                    <Typography>
                      The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle.
                      Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission
                      policy on university admissions.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <List>
                      <ListItem variant="h5" gutterBottom>
                        CONTACT US
                      </ListItem>
                      <ListItem>
                        Faculty of Engineering, Hapugala, Galle, Sri Lanka.
                      </ListItem>
                      <ListItem>
                        Phone: +(94)0 91 2245765/6
                      </ListItem>
                      <ListItem>
                        E-mail: webmaster@eng.ruh.ac.lk
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

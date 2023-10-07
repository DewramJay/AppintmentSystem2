import * as React from 'react';
import { useState } from "react";
import {apiUrl} from "../config";

// import { useDropzone } from 'react-dropzone';

import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { AppBar, Box, Button, CardContent, Chip, CssBaseline, Divider, FormControl, Select, MenuItem, Grid, List, ListItem, Stack, TextField, Toolbar, Typography, InputLabel } from "@mui/material";
// import AdminTopbar from "../../Components/AdminTopbar";
import LoginTopbar from '../Components/LoginTopbar';
import { CenterHeaderCard } from '../Components/CenterHeaderCard';
import { useEffect } from 'react';

export default function SignInPage() {
      const [firstName ,setfirstName] = useState('');
    const [lastName ,setlastName] = useState('');
    const [fullName ,setfullName] = useState('');
    const [regNo,setregNo] = useState('00');
    const [email ,setemail] = useState('');
    const [department ,setdepartment] = useState('');
    const [telephoneNo ,settelephoneNo] = useState('');
    const [password ,setpassword] = useState('');
    const [role ,setrole] = useState('');
    const [userimage ,setuserimage] = useState('');


    useEffect(() => {
  
      console.log(role);
      
    }, [role]);

	// const [data, setData] = useState({
	// firstName: "",
    // lastName: "",
    // fullName: "",
    // regNo: "",
    // email: "",
    // department: "",
    // telephoneNo: "",
    // password: "",
    // role: "",
    // userimage: ""
 
	// });
	const [error, setError] = useState("");
	const navigate = useNavigate();

    
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const data = {
    //         firstName,
    //         lastName,
    //         fullName,
    //         regNo,
    //         email,
    //         department,
    //         telephoneNo,
    //         password,
    //         role,
    //         userimage
    //     }
    //     console.log(data);
    //     try {
    //         const url = "http://localhost:8080/api/users";
    //         const { data: res } = await axios.post(url, data);
    //         navigate("/AddStudent");
    //   alert("created");
    //         console.log(res.message);
    //     } catch (error) {
    //   alert("ttr");
    //         if (
    //             error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //         ) {
    //             setError(error.response.data.message);
    //         }
    //     }

       
    // }  
    
    const handleSubmit = async (e) => {
		e.preventDefault();
        const data = {
            firstName,
            lastName,
            fullName,
            regNo,
            email,
            department,
            telephoneNo,
            password,
            role,
            
        }
		try {
			const url = apiUrl+"/api/users";
			const { data: res } = await axios.post(url, data);
			window.location.reload();
      alert("created");
			console.log(res.message);
		} catch (error) {
      alert(error);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};





    
	// const (e)=> {setlastName(e.target.value);} = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
    //     //console.log(department);
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/api/users";
	// 		const { data: res } = await axios.post(url, data);
	// 		navigate("/LoginPage");
    //   alert("created");
	// 		console.log(res.message);
	// 	} catch (error) {
    //   alert("ttr");
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.message);
	// 		}
	// 	}
	// };



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
          <Toolbar/>
       
            
          <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,backgroundColor:"#FFFFFF",height: '100%'}}>
           
            <Grid item xs={8} md={9}>
              <Box p={2}>
                <CardContent>
                    <Toolbar/>
                    
                <Stack direction="row" spacing={4}>
                <Chip label="First Name" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="firstName" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }} 
                onChange={(e)=> {setfirstName(e.target.value);}}
                value={firstName}
                required
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

                <Stack direction="row" spacing={4}>
                <Chip label="Last Name" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="lastName" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }} 
                onChange={(e)=> {setlastName(e.target.value);}}
                value={lastName}
                required
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

                <Stack direction="row" spacing={4}>
                <Chip label="Name with Initials" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="fullName" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {setfullName(e.target.value);}}
                value={fullName}
                required
                />
                </Stack>

                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

                <Stack direction="row" spacing={4}>
                <Chip label="Role" sx={{ fontSize: "1.0rem", width: "25%" }} />
                
                <FormControl  sx={{ width: '50%' }}>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                    label="role"
                    id=""
                    name="role"
                    size="small"
                    sx={{ fontSize: '1.0rem' }}
                    onChange={(e)=> {setrole(e.target.value);}}
                    value={role}
                    required
                >
                    <MenuItem value="Lecturer">Lecturer</MenuItem>
                    <MenuItem value="Instructor">Instructor</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  
                </Select>
                </FormControl>

                </Stack>


                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

                {role==="Student" && (
                <Stack direction="row" spacing={4}>
                <Chip label="Registration No." sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="regNo" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {setregNo(e.target.value);}}
                value={regNo}
                required
                />
                </Stack>
                )}
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                
                <Chip label="Department" sx={{ fontSize: "1.0rem", width: "25%" }} />
               

                
                <FormControl sx={{ width: '50%' }}>
                <InputLabel htmlFor="department">Department</InputLabel>
                <Select
                    label="department"
                    id="department"
                    name="department"
                    size="small"
                    sx={{ fontSize: '1.0rem' }}
                    onChange={(e)=> {setdepartment(e.target.value);}}
                    value={department}
                    required
                >
                    <MenuItem value="Department of Civil and Environmental Engineering">Department of Civil and Environmental Engineering</MenuItem>
                    <MenuItem value="Department of Electrical and Environmental Engineering">Department of Electrical and Environmental Engineering</MenuItem>
                    <MenuItem value="Department of Mechanical and Manufacturing Engineering">Department of Mechanical and Manufacturing Engineering</MenuItem>
                    
                </Select>
                </FormControl>

               
               
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

            
                <Stack direction="row" spacing={4}>
                <Chip label="Telephone No." sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="telephoneNo" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {settelephoneNo(e.target.value);}}
                value={telephoneNo}
                required
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>

                <Stack direction="row" spacing={4}>
                <Chip label="Email" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="email" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {setemail(e.target.value);}}
                value={email}
                required
                />
                </Stack>
                <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>


                <Stack direction="row" spacing={4}>
                <Chip label="Password" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="password" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {setpassword(e.target.value);}}
                value={password}
                required
                />
                </Stack>

                


                
                {/* <Stack direction = {'row'} flexGrow = {1}sx={{ height:10}}></Stack>
                <Stack direction="row" spacing={4}>
                <Chip label="User Image" sx={{ fontSize: "1.0rem", width: "25%" }} />
                <TextField label="" name="userimage" id="standard-size-small"  size="small" sx={{ fontSize: "1.0rem", width: "50%" }}
                onChange={(e)=> {setuserimage(e.target.value);}}
                value={userimage}
                required
                />
                </Stack> */}


                <Stack direction = {'row'} flexGrow = {1}sx={{ height:30}}></Stack>

                <Stack direction='row'  justifyContent='flex-end'  flexGrow={1} sx={{ height: 30 , width: "77%", marginBottom:2}}>
                <Button variant='contained' onClick={handleSubmit} sx={{ width: '20%' }}>SignIn</Button> 
                {/* <Button variant='contained' sx={{ width: '20%' }}>Add Pdf</Button>  */}
                </Stack>

                <Stack direction='row'  justifyContent='flex-end'  flexGrow={1} sx={{ height: 30 , width: "77%"}}>
                <a href ="/grp19/login" ><Button variant='contained'  sx={{ width: '20%' }}>Back</Button></a> 
                {/* <Button variant='contained' sx={{ width: '20%' }}>Add Pdf</Button>  */}
                </Stack>


                </CardContent>
              </Box>
            </Grid>
          </Box>
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
                <ListItem
                 variant="h5" gutterBottom>
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
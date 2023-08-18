import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { ViewState } from '@devexpress/dx-react-scheduler';

import {  AppBar, Box,  Divider,  Grid, Stack, Toolbar, Typography, Popover, InputLabel, Select, MenuItem, FormControlLabel,Switch, FormLabel, FormGroup } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Dialog, ListItem, List, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, FormControl } from '@mui/material';

import MainTopbar from '../../Components/LectureAccStudentViewTopbar';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { apiUrl } from '../../config';



import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
//import {DataGrid} from '@mui/x-data-grid';
//import { appointments } from './appointments';





//new




const GreenTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: '#C5ECF1 ',
}));

const date = ({date}) => {
    return (
      <Typography variant="h6" sx={{ mb: 2 , textAlign :"center"}}>
        Selected Date: {date.format("ddd DD MMMM")}
      </Typography>
    );
  };

const Testing = () => {
  //const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setmaker(parsedUser.User.regNo);
      //setUser(parsedUser.User);

    }
    
  }, []);

//getting seeker ID
useEffect(() => {
    const storedUser = localStorage.getItem('Lec');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setseeker(parsedUser.User.regNo);
    }
    
  }, []);

  const [time, settime] = useState(null);

  //get appointment to the popover
  const [app, setApp] = useState([]);
  function getApp(){
    const storedUser = localStorage.getItem('Appointment');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setApp(parsedUser.Appointment);
      //settime(app.time);
    }
  }
    
  


  //getting appointment data from DB
  const [appointments, setappointments] = useState([]);
  const [subject, setsubject] = useState('');
  const [notes, setNotes] = useState('');
	
  //console.log(time);
	//const [date, setdate] = useState("");
	const [maker, setmaker] = useState("");
  const [seeker, setseeker] = useState("");
  const [category, setCategory] = useState("");
  const status = 1;
  

//
const [Tempory, setTempory] = useState("");
//

// const handleTime=(time)=>{
//   settime(time);
//   console.log(time);
// }

//function for add appointment
  function sentData(e){
		e.preventDefault();
		
		const newAppointment = {
			subject,
            time,
            date: date.format("ddd DD MMMM"),
            maker,
            seeker,
            notes,
            category,
            status 
		}
		
		axios.post(apiUrl + "/api/appointments/add",newAppointment).then(()=>{
			alert("Appointment Added")
		}).catch((err)=>{
			alert(err)
		})
		
	}

  const [date, setdate] = React.useState(dayjs);
  const [data, setData] = useState({ 
    subject: "",
    // date:"",
    // time:""
  });

 //Date handlibg section
  async function handleDateChange (newDate) {
    
    const result =  await axios.get(apiUrl + "/api/appointments/get?date="+newDate.format("ddd DD MMMM"));
    setappointments(result.data.Appointment);
    setdate(newDate);
  };

    const startTime = new Date();
    startTime.setHours(8, 30, 0); // Set start time to 8.30 AM
   
    //const [notes, setNotes] = useState('');

    // const handleSubjectChange = (event) => {
    //   setsubject(event.target.value);
    // };

    const handleDoubleClick = (time,status) => {
      settime(time);

      if(status === 0){
          setSwitchState(false);
      }
      if(status === 5){
        setSwitchState(true);
    }


      const matchingAppointments = appointments.filter(appointment => (appointment.seeker === seeker || appointment.seeker === maker) && appointment.time === time);
      if (User.role === "Lecturer" && matchingAppointments.length !== 0) { 
        settime(time);
      }
      };

    const handleClose = () => {
        settime(null);
      };

      const handleChange = ({ currentTarget: input }) => {
        
		setData({ ...data, [input.name]: input.value });
	};


  


const [edit, setEdit] = useState(null);

  const handleEdit = () =>{
    setEdit(1);
  }

  const handleEditClose = () => {
    setEdit(null);
  };

  //handle vailibility dropdown
  const [availibility, setAvailibility] = useState(null);

  const handleAvailibility = (time,status) => {
    settime(time);
    setAvailibility(1);

    if(status === 0){
        setSwitchState(false);
    }
    if(status === 5){
      setSwitchState(true);
  }

 };

  const handleAvailibilityClose = () => {
    setAvailibility(null);
  };


  const [User, setUser] = useState([]);
  //function for display details pf appointments
  const handleDetail = (subject) => {
    
    axios
    .get(apiUrl + `/api/appointments/getOne1/${subject}`)
    .then((res) => {
      //setUser(res.data);
      localStorage.setItem('Appointment', JSON.stringify(res.data));
      getApp();
    })
    .catch((err) => {
      alert(subject);
    });
    
  } 

  function UpdateData(id){
    //e.preventDefault();
    axios.put(apiUrl + `/api/appointments/updateAll/${id}`, { 
      maker:app.maker ,
      seeker:app.seeker,
      subject:app.subject,
      notes:app.notes,
      date: date.format("ddd DD MMMM"),
      time:time,
      category:category,
      status:2
     })
      .then((response) => {
        alert('Item updated successfully!');// Handle successful update
      })
      .catch((error) => {
        alert(error.message); // Handle error
      });
    };

  //get User details from localsorage
  useEffect(() => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser.User);
    }
    
  }, []);

  //cancel appointment
  function handleUpdate4(appointmentId){
    const status = 4;
    axios.patch(apiUrl + `/api/appointments/update/${appointmentId}`, { status })
      .then((response) => {
        console.log(response.data); // Handle successful update
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
      
  };


  //popover
  const [anchorEl, setAnchorEl] = useState(null);
    const handleClicK = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloSe = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    const isLecturer = User && User.role === 'Lecturer';
    const isStudent = User && User.role === 'Student';

    //dayepicker
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDatePickerChange = (date) => {
      setdate(date);
    };
  
    const renderCustomDay = (date, selectedDate, DayComponent) => {
      const formattedDate = dayjs(date).format('ddd DD MMMM');
  
      return (
        <DayComponent
          date={date}
          selected={selectedDate !== null && dayjs(selectedDate).isSame(date, 'day')}
        >
          {formattedDate}
        </DayComponent>
      );
    };
  
//handling data of rows in grid 
  const getSlotData = (time, seeker) => {
    //console.log(appointments);
    const matchingAppointments = appointments.filter(appointment => (appointment.seeker === seeker || appointment.seeker === maker) && appointment.time === time).filter(appointment =>(appointment.status===2||appointment.status===5));

    
    if (matchingAppointments.length === 0) {
      return (
        <div>
          {isStudent  && (  
            <Box onDoubleClick={() => handleDoubleClick(time,0)}>Free</Box>
          )} 

          {isLecturer  && (  
            <Box onDoubleClick={() => handleAvailibility(time,0)}>Free</Box>
          )} 
        </div>
        
      ); 
    } else {
      const subject = matchingAppointments[0].subject;
      const category = matchingAppointments[0].category;
      const appointmentNo = matchingAppointments[0]._id;
      const status = matchingAppointments[0].status;
      const maker = matchingAppointments[0].maker;

      //colors for each category
      const backgroundColor = category === 'one' ? '#F2FB96' : //yellow
                       category === 'two' ? '#96C1FB' : //blue
                       category === 'three' ? '#96FBA5' : //green
                       category === 'four' ? '#FB9696' : //red
                       'inherit';

      
      return (
        
        <div>
        {isStudent  && User.regNo === maker &&  (  
        <Box>
        <Box aria-describedby={id} variant="contained"  style={{ backgroundColor }}>
          {subject}
        </Box>
        </Box>
        )}

        {isStudent  && User.regNo !== maker &&  (  
        <Box>
        <Box aria-describedby={id} variant="contained"  style={{ backgroundColor:'#FB9696' }}>
          Not Available
        </Box>
        </Box>
        )}
       
        {isLecturer  && (status===2)&&(
        <Box onMouseEnter={() => handleDetail(appointmentNo)}>
        <Box aria-describedby={id} variant="contained" onMouseEnter={handleClicK} style={{ backgroundColor }}>
          {subject}
        </Box>
        </Box>
        )}
        {isLecturer  && (status===5)&&(
        <Box onDoubleClick={() => handleAvailibility(time,status)} onMouseEnter={() => handleDetail(appointmentNo)}>
        <Box aria-describedby={id} variant="contained" style={{ backgroundColor }}>
          {subject}
        </Box>
        </Box>
        )}
       
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onMouseLeave={handleCloSe}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>{app.seeker}</Typography>
          <Typography sx={{ p: 2 }}>{app.maker}</Typography>
          <Typography sx={{ p: 2 }}>{app.subject}</Typography>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={()=>{handleUpdate4(app._id)}}>cancel appointment</Button>
        </Popover>

        <Dialog open={edit !== null} onClose={handleEditClose}>
                        <DialogTitle>{`Appointment for ${app.time} `}</DialogTitle>
                        <DialogContent>

                       

                        {/* <TextField
                            autoFocus
                            margin="dense"
                            name='time'
                            id="time"
                            label="time"
                            type="text"
                            fullWidth
                            value={app.time}
                            onChange={(e)=>{
                              settime(e.target.value);
              
                            }}
                        /> */}

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">time</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //defaultValue={time}
                            value={app.time}
                            label="time"
                            // disabled={false}
                            // contentEditable={true}
                            onChange={(e) => {
                              setApp((prevApp) => ({
                                ...prevApp,
                                time: e.target.value,
                                
                              }));
                              settime(e.target.value);
                              console.log(time);
                              
                            }}
                            
                          >
                            <MenuItem value={"8:30 AM"}>8:30 AM</MenuItem>
                            <MenuItem value={"9:00 AM"}>9:00 AM</MenuItem>
                            <MenuItem value={"9:30 AM"}>9:30 AM</MenuItem>
                            <MenuItem value={"10:00 AM"}>10:00 AM</MenuItem>
                            <MenuItem value={"10:30 AM"}>10:30 AM</MenuItem>
                            <MenuItem value={"11:00 AM"}>11:00 AM</MenuItem>
                            <MenuItem value={"11:30 AM"}>11:30 AM</MenuItem>
                            <MenuItem value={"12:00 PM"}>12:00 PM</MenuItem>
                            <MenuItem value={"12:30 PM"}>12:30 PM</MenuItem>
                            <MenuItem value={"01:00 PM"}>01:00 PM</MenuItem>
                            <MenuItem value={"01:30 PM"}>01:30 PM</MenuItem>
                            <MenuItem value={"02:00 PM"}>02:00 PM</MenuItem>
                          </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                          <DatePicker
                            label="Select a date"
                            value={date}
                            onChange={(newValue) => {
                              const selectedDate = newValue ? newValue.format("MM/DD/YYYY") : null;

                              setApp((prevApp) => ({
                                ...prevApp,
                                date: selectedDate,
                              }));

                              setdate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>

                        </DialogContent>
                        <DialogActions>
                        <Button >Cancel</Button>
                        <Button onClick={()=>{UpdateData(app._id)}}>Save</Button>
                        {/* disabled={!subject} */}
                        </DialogActions>
                    </Dialog>
        </div>
        

        )
    }
  }

  
    

    
    const handleSave = () => {
        console.log(`Appointment for ${time}: Subject: ${subject}`);
        settime(null);
        //setSubject('');
        //setNotes('');
      };

      //slide switch
      const [switchState, setSwitchState] = useState(false);

      const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
      };

      //not available
      const blockSchedule = (e)=>{

        e.preventDefault();
        const newAppointment = {
                subject:"Not Available",
                time,
                date: date.format("ddd DD MMMM"),
                maker,
                seeker:User.regNo,
                notes,
                category:"four",
                status:5 
        }
        
        axios.post(apiUrl + "/api/appointments/add",newAppointment).then(()=>{
          alert("Done")
        }).catch((err)=>{
          alert(err)
        })
      }

      //available
      const removeBlock = (e) =>{
        e.preventDefault();
		
        axios
        .delete(apiUrl + `/api/appointments/delete/${app._id}`)
        .then(() => {
      
          alert('Slot is available');
        })
        .catch((error) => {
          console.log(error);
        });

      }
    
      // filling time column of the data grid
      const rows = [];
      for (let i = 0; i < 12; i++) {
        const time = new Date(startTime.getTime() + i * 30 * 60000); // Increment time by 30 minutes
        const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        //getapppointments(formattedTime);
        rows.push(
          <TableRow key={i}>
            
            <TableCell >{formattedTime}</TableCell>
            <TableCell >{getSlotData(formattedTime, seeker)}</TableCell>
          </TableRow>
        );
      }

      if (maker == null) {
        return <div>Loading</div>
      }


      const boxstyle = {
   
  
        position: 'absolute',
        width: '1000px',
        height: '1px',
        left: '500px',
        top: '1px',
       
      };

  return (
    <Box >

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <MainTopbar/>
        </AppBar>
        <Toolbar/>
        <Toolbar/>
        <Toolbar/>
      <Stack direction = {'row'} flexGrow = {1}sx={{ height:50}}></Stack>
      <Box  sx={{
                   top:'10px',
                   height:'100px',
                    width:'30%',
                   
                }}>
                  
                <Stack spacing={10} direction="row" flexGrow = {1} alignItems="left" justifyContent="flex-start"  style={{ marginRight: '1spx' }}>
                <Paper sx={{ flexGrow: 1, width: '100%' , backgroundColor:''}}>
                  
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="h6" sx={{ mb: 2 , textAlign :"center"}}>
                   Selected Date: {date.format("ddd DD MMMM")}
                </Typography>
                <StaticDatePicker
                   displayStaticWrapperAs="desktop"
                   value={date}
                   onChange={handleDateChange}
                   slotProps={{
                     toolbar: { toolbarFormat: 'ddd DD MMMM', hidden: false },
                   }}
                 />                                       
                </LocalizationProvider>
                                   
                </Paper>
                </Stack>
                </Box>

              <Box  style={boxstyle}  sx={{left: '100px',height:'1000px',width:'70%'}}
               
                >
                  <Toolbar/>
                    <Typography
                    variant='h6'
                    component='h6'
                    sx={{textAlign:'center',mt:3,mb:3}}
                    >
                          Date:   {date.format("ddd DD MMMM")}
                    </Typography>

                    <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="appointment table">
                        <TableHead>
                            <TableRow>
                            <GreenTableCell >Time</GreenTableCell>
                            <GreenTableCell >Subject</GreenTableCell>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                        </Table>
                    </TableContainer>

                    {/* Student view of appointment form */}
                    {User.role === "Student" && (
                    <Dialog open={time !== null} onClose={handleClose}>
                        <DialogTitle>{`Appointment for ${time} `}</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter the details of your appointment.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            name='subject'
                            margin="dense"
                            id="subject"
                            label="Subject"
                            type="text"
                            fullWidth
                            value={subject}
                            onChange={(e)=>{
                              setsubject(e.target.value);
              
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name='time'
                            id="time"
                            label="time"
                            type="text"
                            fullWidth
                            value={time}
                            onChange={(e)=>{
                              settime(e.target.value);
              
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name='date'
                            id="date"
                            label="date"
                            type="text"
                            fullWidth
                            value={date.format("ddd DD MMMM")}
                            onChange={(e)=>{
                              setdate(e.target.value);
              
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name='maker'
                            id="maker"
                            label="maker"
                            type="text"
                            fullWidth
                            value={maker}
                            onChange={(e)=>{
                              setmaker(e.target.value);
              
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name='seeker'
                            id="seeker"
                            label="seeker"
                            type="text"
                            fullWidth
                            value={seeker}
                            onChange={(e)=>{
                              setseeker(e.target.value);
              
                            }}
                        />

                        {/* <TextField
                            autoFocus
                            margin="dense"
                            name='category'
                            id="category"
                            label="category"
                            type="text"
                            fullWidth
                            value={category}
                            onChange={(e)=>{
                              setCategory(e.target.value);
              
                            }}
                        /> */}

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="category"
                            onChange={(e)=>{
                              setCategory(e.target.value);
                            }}
                          >
                            <MenuItem value={"one"}>one</MenuItem>
                            <MenuItem value={"two"}>two</MenuItem>
                            <MenuItem value={"three"}>three</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                            autoFocus
                            margin="dense"
                            name='notes'
                            id="notes"
                            label="notes"
                            type="text"
                            fullWidth
                            value={notes}
                            onChange={(e)=>{
                              setNotes(e.target.value);
              
                            }}
                        />
                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={sentData} >Save</Button>
                        {/* disabled={!subject} */}
                        </DialogActions>
                    </Dialog>
                    )}

                    {/* lecturer view of appointment form */}
                    {User.role === "Lecturer" && (
                    <Dialog open={availibility !== null} onClose={handleAvailibilityClose}>
                        <DialogTitle>{`Schedule for ${time} `}</DialogTitle>
                        <DialogContent>
                        
                        

                        <FormControl component="fieldset">
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value="start"
                              control={<Switch color="primary" checked={switchState} onChange={handleSwitchChange} />}
                              
                              label="not available"
                              labelPlacement="start"
                            />
                          </FormGroup>
                        </FormControl>


                        
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={switchState ? blockSchedule : removeBlock }>Save</Button>
                        {/* disabled={!subject} */}
                        </DialogActions>
                    </Dialog>
                    )}

                    </>

              </Box>

         

              <Stack direction = {'row'} flexGrow = {1}sx={{ height:700}}></Stack>

{/* <Box>

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


</Box> */}

    </Box>

    
  )
};

export default Testing
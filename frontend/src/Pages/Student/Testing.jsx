import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { ViewState } from '@devexpress/dx-react-scheduler';

import {  AppBar, Box,  Divider,  Grid, Stack, Toolbar, Typography, Popover, InputLabel, Select, MenuItem } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Dialog, ListItem, List, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, FormControl } from '@mui/material';

import MainTopbar from '../../Components/LectureAccStudentViewTopbar';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
//import {DataGrid} from '@mui/x-data-grid';
//import { appointments } from './appointments';


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

  //get appointment to the popover
  const [app, setApp] = useState([]);
  function getApp(){
    const storedUser = localStorage.getItem('Appointment');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setApp(parsedUser.Appointment);
    }
  }
    
  


  //getting appointment data from DB
  const [appointments, setappointments] = useState([]);
  
  const [subject, setsubject] = useState('');
  const [notes, setNotes] = useState('');
	const [time, settime] = useState("");
	//const [date, setdate] = useState("");
	const [maker, setmaker] = useState("");
  const [seeker, setseeker] = useState("");
  const [category, setCategory] = useState("");
  const status = 1;
  

//
const [Tempory, setTempory] = useState("");
//


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
		
		axios.post("http://localhost:8080/api/appointments/add",newAppointment).then(()=>{
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
    
    const result =  await axios.get("http://localhost:8080/api/appointments/get?date="+newDate.format("ddd DD MMMM"));
    setappointments(result.data.Appointment);
    setdate(newDate);
  };

    const startTime = new Date();
    startTime.setHours(8, 30, 0); // Set start time to 8.30 AM
   
    //const [notes, setNotes] = useState('');

    // const handleSubjectChange = (event) => {
    //   setsubject(event.target.value);
    // };

    const handleDoubleClick = (time) => {
        settime(time);
      };

    const handleClose = () => {
        settime(null);
      };

      const handleChange = ({ currentTarget: input }) => {
        
		setData({ ...data, [input.name]: input.value });
	};

  const [User, setUser] = useState([]);
  //function for display details pf appointments
  const handleDetail = (subject) => {
    
    axios
    .get(`http://localhost:8080/api/appointments/getOne1/${subject}`)
    .then((res) => {
      setUser(res.data);
      localStorage.setItem('Appointment', JSON.stringify(res.data));
      getApp();
    })
    .catch((err) => {
      alert(err.message);
    });
    
  } 

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
  

  
//handling data of rows in grid 
  const getSlotData = (time, seeker) => {
    console.log(appointments);
    const matchingAppointments = appointments.filter(appointment => (appointment.seeker === seeker || appointment.seeker === maker) && appointment.time === time);

    
    if (matchingAppointments.length === 0) {
      return "Free";
    } else {
      const subject = matchingAppointments[0].subject;
      const category = matchingAppointments[0].category;

      //colors for each category
      const backgroundColor = category === 'one' ? 'yellow' : 
                       category === 'two' ? 'blue' :
                       category === 'three' ? 'green' :
                       'inherit';

      return (
        <div>
        <Box onMouseEnter={() => handleDetail(subject)}>
        <Box aria-describedby={id} variant="contained"  onMouseEnter={handleClicK} style={{ backgroundColor }}>
          {subject}
        </Box>
        </Box>
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
        </Popover>
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
    
    
      // filling time column of the data grid
      const rows = [];
      for (let i = 0; i < 12; i++) {
        const time = new Date(startTime.getTime() + i * 30 * 60000); // Increment time by 30 minutes
        const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        //getapppointments(formattedTime);
        rows.push(
          <TableRow key={i}>
            
            <TableCell >{formattedTime}</TableCell>
            <TableCell onDoubleClick={() => handleDoubleClick(formattedTime)}>{getSlotData(formattedTime, seeker)}</TableCell>
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
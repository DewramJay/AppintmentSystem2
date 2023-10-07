import * as React from 'react';
import axios from 'axios';

import { Divider,  Fade, Menu,Avatar, Box, Button, Chip, Toolbar,InputBase} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled, alpha } from '@mui/material/styles';


import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { AppBar, Grid, Typography, Stack, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import MainTopbar from "../../Components/MainTopbar";

import { apiUrl } from '../../config';




const SelectedDate = ({selectedDate}) => {
  return (
    <Typography variant="h6" sx={{ mb: 2 , textAlign :"center"}}>
      Selected Date: {selectedDate.format("ddd DD MMMM")}
    </Typography>
  );
};


const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

//appointment color change
const Appointment = ({ children, style, ...restProps }) => {
  const { category, status } = restProps.data; // Assuming that the appointment data contains a 'status' property

  let backgroundColor = '#FFC107'; // Default color
  if ( category === 'zero') {
    backgroundColor = '#DC143C'; // red color 
  }else if ( status === 1) {
    backgroundColor = '#B2BEB5'; // ash color 
  }else if (category === 'one') {
    backgroundColor = '#4CAF50'; // Green color for category 'one'
  } else if (category === 'two') {
    backgroundColor = '#FEBE00'; // Yellow color for category 'two'
  } else if (category === 'three') {
    backgroundColor = '#2196F3'; // Blue color for category 'three'
  }

  const appointmentStyle = {
    ...style,
    backgroundColor,
    borderRadius: '8px',
  };

  return (
    <Appointments.Appointment
      {...restProps}
      style={appointmentStyle}
    >
      {children}
    </Appointments.Appointment>
  );
};




const Schedular = () => {
   
const CustomFormControl = ({ value, onChange }) => (
  null
    // <FormControl fullWidth>
    //   <InputLabel id="demo-simple-select-label">Category</InputLabel>
    //   <Select
    //     labelId="demo-simple-select-label"
    //     id="demo-simple-select"
    //     value={value}
    //     label="category"
    //     onChange={(e) => {
    //       setCategory(e.target.value);
    //     }}
    //   >
    //     <MenuItem value={"one to one meeting"}>one</MenuItem>
    //     <MenuItem value={"Group Meeting"}>two</MenuItem>
    //     <MenuItem value={"Online Meeting"}>three</MenuItem>
    //   </Select>
    // </FormControl>
  );
  
  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } return null;
  };
  
  const InputComponent = (props) => {
    if (props.type === 'titleTextEditor') {
      return null;
    }
  };
  
  const BoolEditor = (props) => {
    // return <AppointmentForm.BooleanEditor
    // { ...props}
    // />
    return null;
  };
  
  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    // const onCustomFieldChange = (nextValue) => {
    //   onFieldChange({ customField: nextValue });
    // };
    const onCustomFormChange = (nextValue) => {
      onFieldChange({ customForm: nextValue });
    };
  
    return ( 
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        {/* <AppointmentForm.Label
          text="Other details"
          type="title"
        /> */}
        {/* <AppointmentForm.TextEditor
          value={appointmentData.customField}
          onValueChange={onCustomFieldChange}
          placeholder="Custom field"
        /> */}
        {/* <CustomFormControl
          value={appointmentData.customForm}
          onChange={onCustomFormChange}
        /> */}
      </AppointmentForm.BasicLayout>
    );
  };
  
  
    
    const [appId, setappId] = useState([]);
    const [appointments, setappointments] = useState([]);
    const [data, setData] = useState(appointments);
    const [currentDate, setCurrentDate] = useState('2018-06-29');
    const [selectedDate, setSelectedDate] = React.useState(dayjs);
    const [maker, setmaker] = useState("");
    const [seeker, setseeker] = useState("");
    const [makerNo, setmakerNo] = useState("");
    const [seekerNo, setseekerNo] = useState("");
    const [category, setCategory] = useState("");
    const [user, setUser] = useState([]);

    const [date, setdate] = React.useState(dayjs);
  
   
    useEffect(() => {
      const storedUser = localStorage.getItem('User');
  
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setmakerNo(parsedUser.User.email);
        setmaker(parsedUser.User.fullName);
        setUser(parsedUser.User);
  
      }
      
    }, []);
  
  //getting seeker ID
  useEffect(() => {
      const storedUser = localStorage.getItem('Lec');
  
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setseeker(parsedUser.User.fullName);
        setseekerNo(parsedUser.User.email);
      }
      
    }, []);
      
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };

    const test = makerNo;
  
    useEffect(() => {
      fetchAppointments();
    }, [makerNo]);
  
    const fetchAppointments = () => {
      console.log(test);
      axios.get(apiUrl+'/api/appointments/get')
        .then((response) => {
          const filteredAppointments = response.data.Appointment.filter(appointment => (appointment.makerNo === makerNo || appointment.seekerNo === makerNo))
          .filter(appointment => (appointment.status === 1||appointment.status===2));
          console.log(filteredAppointments);
          setData(filteredAppointments);
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    };
    //console.log(data);
  
    function mergeObjects(obj1, obj2) {
      for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
          obj1[key] = obj2[key];
        }
      }
    }
  
  
    const commitChanges = ({ added, changed, deleted }) => {
      setData((prevData) => {
        let updatedData = [];
  
        if (added) {
          const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
          const status = 2;
          const category = "zero";
          //const title = "Not Available";
          updatedData =  { title:"", status, id:startingAddedId, seeker:seeker, seekerNo:seekerNo, makerNo:makerNo, category,  ...added };
          
          axios.post(apiUrl+"/api/appointments/add",updatedData).then(()=>{
            alert("Appointment Added")
            window.location.reload();
          }).catch((err)=>{
            alert(err)
          }) 
  
          console.log("ff"+updatedData);
  
        }
        if (changed) {
        //   updatedData = updatedData.map((appointment) =>
        //   changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
          
        // );
  
  
        const id = Object.keys(changed)[0];
  
  
        console.log(id);
        const app = data.find((appointment) => appointment.id == id);
  
  
        const updatedFields = changed[id];
  
  
        //console.log(updatedFields);
        //console.log(app);
  
  
        mergeObjects(app, updatedFields);
  
        console.log(app._id);
  
        axios.put(apiUrl+`/api/appointments/updateAll/${app._id}`,app)
        .then((response) => {
          console.log(response.data); // Handle successful update
          window.location.reload();
        })
        .catch((error) => {
          console.error(error); // Handle error
        });
  
        
       
  
        }
        if (deleted !== undefined) {
  
  
  
          const app = data.find((appointment) => appointment.id === deleted);
          
  
          const deleteId = app._id;
  
  
  
          const status = 4;
          //console.log("appId");
          axios.patch(apiUrl+`/api/appointments/update/${deleteId}`, { status })
            .then((response) => {
              console.log(response.data); // Handle successful update
              window.location.reload()
            })
            .catch((error) => {
              console.error(error); // Handle error
            }); 
        }
      });
    };
  
    useEffect(() => {
      //console.log(appId);
    }, [appId]);
  
     /************8888888888888888888888888888888888888888888888888888888888888 */

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
    
    // export default function MainTopbar() {
    //   const [user, setUser] = useState(null);
    
      useEffect(() => {
        const storedUser = localStorage.getItem('User');
    
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
    
          setUser(parsedUser.User);
          // console.log(user);
        }
        
        
      }, []);
    
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
    


    
    /************8888888888888888888888888888888888888888888888888888888888888 */
      
      return (
        <Grid>
          <AppBar position="static" sx={{ backgroundColor:'#198897'}}>
          <Toolbar>
          <Stack direction = {'row'} flexGrow = {1} alignItems="center" justifyContent="flex-start" spacing={1}>
            <StyledAvatar src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"  sx={{ width: 56, height: 75 }} variant="square"/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"revert-layer" }}>
                UNIVERSITY OF RUHUNA
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
                        <a href="/grp19/login"><MenuItem onClick={handleClose}>Logout</MenuItem></a>
                    </Menu>
                    </div>

                </Stack>
                
          </Stack> 
         </Toolbar>
        </AppBar>
          <Stack spacing={10} direction="row" flexGrow={1} alignItems="center" justifyContent="flex-start">
            <Paper sx={{ flexGrow: 1, width: '30%', backgroundColor: '', margin: 20 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  Selected Date: {selectedDate.format('ddd DD MMMM')}
                </Typography>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{
                    toolbar: { toolbarFormat: 'ddd DD MMMM', hidden: false },
                  }}
                />
              </LocalizationProvider>
            </Paper>
        
            <Scheduler data={data} >
              <ViewState currentDate={selectedDate.toDate()} />
              <EditingState onCommitChanges={(changes) => commitChanges(changes, category)} />
              <IntegratedEditing />
              <DayView startDayHour={9} endDayHour={15} />
              <Appointments appointmentComponent={Appointment}/>
              <AppointmentTooltip showOpenButton showDeleteButton />
              <ConfirmationDialog />
              <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={InputComponent} booleanEditorComponent={BoolEditor}  />
              
              </Scheduler>
          </Stack>
        </Grid>
      );
  
}

export default Schedular
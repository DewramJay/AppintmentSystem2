import * as React from 'react';
import axios from 'axios';
//import MainTopbar from "../Components/MainTopbar";
import { Divider,  Fade, Menu,Avatar, Box, Button, Chip, Toolbar,InputBase, TextField, Input} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {  alpha } from '@mui/material/styles';

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


import {AppBar, Grid, Typography, Stack, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MainTopbar from "../../Components/MainTopbar";

import { apiUrl } from '../../config';


//tooltip
const PREFIX = "Demo";

const classes = {
  button: `${PREFIX}-button`
};
// export default function MainTopbar() {
//   const [user, setUser] = useState(null);}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    color: theme.palette.background.default,
    padding: 0
  }
}));
const MyAppointment = ({
  children,
  data,
  onClick,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => {
  //const classes = useStyles();

  

  return (
    <Appointments.Appointment {...restProps}>
      <React.Fragment>
        <StyledIconButton
          className={classes.button}
          onClick={({ target }) => {
            toggleVisibility();
            onAppointmentMetaChange({
              target: target.parentElement.parentElement,
              data
            });
          }}
          size="large"
        >
          <InfoIcon fontSize="small" />
        </StyledIconButton>
        {children}
      </React.Fragment>
    </Appointments.Appointment>
  );
};


//tooltip end




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


export const ShedularStudent = () => {
    const CustomFormControl = ({ value, onChange }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <MenuItem value={"one"}>one to one meeting</MenuItem>
            <MenuItem value={"two"}>group meeting</MenuItem>
            <MenuItem value={"three"}>online meeting</MenuItem>
          </Select>
          <TextField
                            autoFocus
                            name='notes'
                            margin="dense"
                            label="Notes"
                            type="text"
                            fullWidth
                            value={notes}
                            onChange={(e)=>{
                              setNotes(e.target.value);
              
                            }}
                        />
        </FormControl>
      );
      

      //appointment color change
      const Appointment = ({ children, style, ...restProps }) => {
        const { category, status, makerNo } = restProps.data; // Assuming that the appointment data contains a 'status' property
        let backgroundColor = '#FFC107'; // Default color
        if ( status === 1) {
          backgroundColor = '#B2BEB5'; // ash color 
        }else if (makerNo !== user.email) {
          backgroundColor = '	#DC143C'; // Red color for category 'one'
        }else if (category === 'one') {
          backgroundColor = '#4CAF50'; // Green color for category 'one'
        } else if ( category === 'two') {
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
            { makerNo === user.email ? (status === 2 ? children : 'Pending') : 'Not available'}
          </Appointments.Appointment>
        );
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
            <AppointmentForm.Label
              text="Other details"
              type="title"
            />
            {/* <AppointmentForm.TextEditor
              value={appointmentData.customField}
              onValueChange={onCustomFieldChange}
              placeholder="Custom field"
            /> */}
            <CustomFormControl
              value={appointmentData.customForm}
              onChange={onCustomFormChange}
            />
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
        const [notes, setNotes] = useState("");
        
        const [date, setdate] = React.useState(dayjs);
      
        const [user, setUser] = useState([]);
        const [lec, setLec] = useState([]);
       
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
            setLec(parsedUser.User);
          }
          
        }, []);
          
        const handleDateChange = (newDate) => {
          setSelectedDate(newDate);
        };
      
        useEffect(() => {
          fetchAppointments();
        }, [seekerNo]);
      
       

        const fetchAppointments = () => {
          axios.get(apiUrl+'/api/appointments/get')
            .then((response) => {
               // console.log("tt"+seekerNo);///////check this one
              const filteredAppointments = response.data.Appointment.filter(appointment => (appointment.seekerNo === seekerNo || appointment.makerNo === seekerNo)).filter(appointment => appointment.status === 1||appointment.status===2);
              setData(filteredAppointments);
            })
            .catch((error) => {
              console.error('Error fetching appointments:', error);
            });
        };
        //console.log(data);
      
      
      
      
        const commitChanges = ({ added, changed, deleted }) => {
          setData((prevData) => {
            let updatedData = [];
      
            if (added) {
              const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
              const status = 1;
              updatedData = { title:"" ,status, id:startingAddedId, seeker:seeker, maker:maker,seekerNo:seekerNo, makerNo:makerNo, category, notes,  ...added };
              
              axios.post(apiUrl+"/api/appointments/add",updatedData).then(()=>{
                alert("Appointment Added")
                window.location.reload();
              }).catch((err)=>{
                alert(err)
              }) 
          
            }
            if (changed) {
            //   updatedData = updatedData.map((appointment) =>
            //   changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
              
            // );
            const app = data.find((appointment) => appointment.id === changed);
      
            console.log('updateid'+app);
      
            }
            if (deleted !== undefined) {
      
      
      
              const app = data.find((appointment) => appointment.id === deleted);
             
      
              const deleteId = app._id;
      
      
      
              const status = 4;
              //console.log("appId");
              axios.patch(apiUrl+`/api/appointments/update/${deleteId}`, { status })
                .then((response) => {
                  console.log(response.data); // Handle successful update
                  //window.location.reload();
                })
                .catch((error) => {
                  console.error(error); // Handle error
                });
      
      
            }
            return updatedData;
          });
        };
      
        useEffect(() => {
          //console.log(appId);
        }, [appId]);
      
      //tooltip
      const toggleVisibility = () => {
        setVisible((prevVisible) => !prevVisible);
      };
    
      const onAppointmentMetaChange = ({ data, target }) => {
        setAppointmentMeta({ data, target });
      };
    
      const myAppointment = (props) => (
        <MyAppointment
          {...props}
          toggleVisibility={toggleVisibility}
          onAppointmentMetaChange={onAppointmentMetaChange}
        />
      );
      //tooltip
      //const [data, setData] = useState(appointments);
      const [visible, setVisible] = useState(false);
      const [appointmentMeta, setAppointmentMeta] = useState({
        target: null,
        data: {}
      });

      const isAppointmentInSlot = (slotStartDate, slotEndDate) => {
        return data.some(appointment => {
          const appointmentStartDate = new Date(appointment.startDate);
          const appointmentEndDate = new Date(appointment.endDate);
          console.log('appointmentStartDate');
          return (
            appointmentStartDate <= slotEndDate && appointmentEndDate >= slotStartDate
          );
        });
      };


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
                <Paper sx={{ flexGrow: 1, width: '100%', backgroundColor: '' }}>
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
            
                <Scheduler data={data}>
                  <ViewState currentDate={selectedDate.toDate()} />
                  <EditingState onCommitChanges={(changes) => commitChanges(changes, category)} />
                  <IntegratedEditing />
                  <DayView startDayHour={9} endDayHour={15} />
                  <Appointments appointmentComponent={Appointment}/>
                  <AppointmentTooltip
                    showCloseButton
                    visible={false}
                    onVisibilityChange={toggleVisibility}
                    appointmentMeta={appointmentMeta}
                    onAppointmentMetaChange={onAppointmentMetaChange}
                  />
                  <ConfirmationDialog />
                  <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={TextEditor} booleanEditorComponent={BoolEditor} />
                  </Scheduler>
              </Stack>
            </Grid>
          );
}

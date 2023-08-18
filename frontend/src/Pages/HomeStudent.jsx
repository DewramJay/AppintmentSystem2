import { AppBar, Box, Button, Card, CardContent, Chip, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import MainTopbar from "../Components/MainTopbar";
import SideDrawer from "../Components/SideDrawer";
import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import axios from "axios";

export default function HomeStudent() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser.User);
    }

  }, []);

  useEffect(() => {
    function getAppointments() {
      axios
        .get(apiUrl + "/api/appointments/")
        .then((res) => {
          // Reverse the appointment list
          const reversedAppointments = res.data.reverse();
          setAppointments(reversedAppointments);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppointments();
  }, []);

  const [seeker, setSeeker] = useState([]);

  function getSeekerName(name) {
    axios
      .get(apiUrl +`/api/users/getName/${name}`)
      .then((res) => {
        setSeeker(res.data.User);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleUpdate2(appointmentId) {
    const status = 2;
    axios.patch(apiUrl +`/api/appointments/update/${appointmentId}`, { status })
      .then((response) => {
        console.log(response.data); // Handle successful update
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
    axios
      .get(apiUrl +"/api/appointments/")
      .then((res) => {
        // Reverse the appointment list
        const reversedAppointments = res.data.reverse();
        setAppointments(reversedAppointments);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function handleUpdate3(appointmentId) {
    const status = 3;
    axios.patch(apiUrl +`/api/appointments/update/${appointmentId}`, { status })
      .then((response) => {
        console.log(response.data); // Handle successful update
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
    axios
      .get(apiUrl + "/api/appointments/")
      .then((res) => {
        // Reverse the appointment list
        const reversedAppointments = res.data.reverse();
        setAppointments(reversedAppointments);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const isStudent = user && user.role === 'Student';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <MainTopbar />
      </AppBar>
      <SideDrawer />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box p={2}>
                <Chip label="Scheduled Appointments" sx={{ fontSize: "1.2rem", backgroundColor: "#C5ECF1" }} />
                {isStudent && (
                  <a href="/StaffDetailsElec"><Button variant='contained' sx={{ width: 100, backgroundColor: "#46B7C7" }}>
                    VIEW
                  </Button></a>
                )}
              </Box>
              {appointments
                .filter(item => item.maker === user.regNo && user.role === "Student")
                .filter(item => item.status === 2)
                .map((item) => (
                  <Grid item xs={12} sm={6} md={12} key={item.appointmentNo}>
                    <Card sx={{ border: '2px solid blue', width: '100%' }}>
                      <CardContent>
                        <Typography textAlign={'left'}>
                          with {item.seeker}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Reason: {item.subject}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Date: {item.date}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Time: {item.time}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              {appointments
                .filter(item => item.seeker === user.regNo && user.role === "Lecturer")
                .filter(item => item.status === 2)
                .map((item) => (
                  <Grid item xs={12} sm={6} md={12} key={item._id}>
                    <Card sx={{ border: '2px solid blue', width: '100%' }}>
                      <CardContent>
                        <Typography textAlign={'left'}>
                          with {item.maker}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Reason: {item.subject}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Date: {item.date}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Time: {item.time}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12} md={6} sx={{ bgcolor: "#C5ECF1" }}>
              <Box p={2}>
                <Chip label="Notifications" sx={{ fontSize: "1.2rem", backgroundColor: "#FFFFFF" }} />
              </Box>
              {appointments
                .filter(item => item.maker === user.regNo && user.role === "Student")
                .filter(item => item.status >= 2)
                .map((item) => (
                  <Grid item xs={12} sm={6} md={12} key={item._id}>
                    {item.status === 2 && (
                      <Card sx={{ border: '2px solid blue', width: '100%' }}>
                        <CardContent>
                          <Typography textAlign={'left'}>
                            {item.seeker} accepted the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                    {item.status === 3 && (
                      <Card sx={{ border: '2px solid blue', width: '100%' }}>
                        <CardContent>
                          <Typography textAlign={'left'}>
                            {item.seeker} rejected the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                    {item.status === 4 && (
                      <Card sx={{ border: '2px solid blue', width: '100%' }}>
                        <CardContent>
                          <Typography textAlign={'left'}>
                            {item.seeker} cancelled the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}

                  </Grid>
                ))}
              {appointments
                .filter(item => item.seeker === user.regNo && user.role === "Lecturer")
                .filter(item => item.status === 1)
                .map((item) => (
                  <Grid item xs={12} sm={6} md={12} key={item._id}>
                    <Card sx={{ border: '2px solid blue', width: '100%' }}>
                      <CardContent>
                        <Typography textAlign={'left'}>
                          with {seeker.fullName}
                        </Typography>
                        <Typography textAlign={'left'}>
                          with {item.maker}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Reason: {item.subject}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Date: {item.date}
                        </Typography>
                        <Typography textAlign={'left'}>
                          Time: {item.time}
                        </Typography>
                        <Button onClick={() => handleUpdate2(item._id)}>accept</Button>
                        <Button onClick={() => handleUpdate3(item._id)}>delete</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

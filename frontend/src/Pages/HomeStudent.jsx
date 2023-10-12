import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Grid,
  Toolbar,
  Modal,
  Typography,
} from "@mui/material";
import MainTopbar from "../Components/MainTopbar";
import SideDrawer from "../Components/SideDrawer";
import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import axios from "axios";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function HomeStudent() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

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
      .get(apiUrl + `/api/users/getName/${name}`)
      .then((res) => {
        return res.data.User.fullName;
        //console.log(res.data.User);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //Popup card
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (modalOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  ////

  //get appointment detial to popup
  const [appointment, setAppointment] = useState([]);

  function getApp(data) {
    axios
      .get(apiUrl + `/api/appointments/getOne/${data}`)
      .then((res) => {
        setAppointment(res.data);
        localStorage.setItem("Appointment", JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleUpdate2(appointmentId) {
    const status = 2;
    axios
      .patch(apiUrl + `/api/appointments/update/${appointmentId}`, { status })
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
  }

  function handleUpdate3(appointmentId) {
    const status = 3;
    axios
      .patch(apiUrl + `/api/appointments/update/${appointmentId}`, { status })
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
  }

  const slotBackgroundColor = (category) => {
    const backgroundColor =
      category === "one"
        ? "#4CAF50" //green
        : category === "two"
        ? "#FEBE00" //yellow
        : category === "three"
        ? "#2196F3" //blue
        : category === "four"
        ? "#FB9696" //red
        : "inherit";

    return backgroundColor;
  };

  //time date seperator
  function DateTime(dateString) {
    // Parse the date string
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");

    // Extract time components
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const dateStyle = {
      marginTop: "1px",
      marginBottom: "0", // Adjust the margin bottom as needed
    };

    return (
      <Grid>
        <p style={dateStyle}>
          Date: {year}-{month}-{day}
        </p>
        <p style={dateStyle}>
          Time: {hours}:{minutes}
        </p>
      </Grid>
    );
  }

  const isStudent = user && user.role === "Student";

  return (
    <Box sx={{ display: "flex", borderRadius: "100px" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MainTopbar />
      </AppBar>
      <SideDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Box p={2}>
                <Chip
                  label="Scheduled Appointments"
                  sx={{ fontSize: "1.2rem", backgroundColor: "#C5ECF1" }}
                />
                {isStudent && (
                  <a href="/grp19/StaffDetailsElec">
                    <Button
                      borderLeft="10px"
                      variant="contained"
                      sx={{
                        width: 100,
                        backgroundColor: "#46B7C7",
                        left: "100px",
                      }}
                    >
                      VIEW
                    </Button>
                  </a>
                )}
              </Box>
              {appointments
                .filter(
                  (item) =>
                    item.makerNo === user.email && user.role === "Student"
                )
                .filter((item) => item.status === 2)
                .map((item) => (
                  <Grid
                    onClick={toggleModal}
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    key={item.appointmentNo}
                    marginTop={2}
                  >
                    <Card
                      sx={{
                        /*border: "2px solid blue",*/ width: "80%",
                        borderRadius: "20px",
                        bgcolor: "#C5ECF1",
                      }}
                    >
                      <CardContent onClick={() => getApp(item._id)}>
                        <Typography textAlign={"left"}>
                          with {item.seeker}
                        </Typography>
                        <Typography textAlign={"left"}>
                          Reason: {item.title}
                        </Typography>
                        <Typography textAlign={"left"}>
                          {DateTime(item.startDate)}
                        </Typography>
                      </CardContent>
                    </Card>

                    {/*  */}
                    <Modal
                      open={modalOpen}
                      onClose={toggleModal}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box
                        className="modal-content"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 400, // Set the desired width for your form
                          bgcolor: "white", // Set the background color to white
                          boxShadow: 24,
                          p: 4,
                          borderRadius: "10px",
                        }}
                      >
                        <Typography variant="h6" id="modal-title">
                          ff
                        </Typography>

                        <Button onClick={toggleModal} variant="contained">
                          CLOSE
                        </Button>
                      </Box>
                    </Modal>
                    {/*  */}
                  </Grid>
                ))}
              {appointments
                .filter(
                  (item) =>
                    item.seekerNo === user.email &&
                    item.makerNo !== user.email &&
                    (user.role === "Instructor" || user.role === "Lecturer")
                )
                .filter((item) => item.status === 2)
                .map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    key={item.appointmentNo}
                    marginTop={2}
                  >
                    <Card
                      sx={{
                        /*border: "2px solid blue",*/ width: "80%",
                        borderRadius: "20px",
                        bgcolor: slotBackgroundColor(item.category),
                      }}
                    >
                      <CardContent>
                        <Typography textAlign={"left"}>
                          with {item.maker}
                        </Typography>
                        <Typography textAlign={"left"}>
                          Reason: {item.title}
                        </Typography>
                        <Typography textAlign={"left"}>
                          {DateTime(item.startDate)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            <Grid item xs={12} md={6} sx={{ bgcolor: "#C5ECF1" }} marginTop={2}>
              <Box p={2}>
                <Chip
                  label="Notifications"
                  sx={{
                    fontSize: "1.2rem",
                    backgroundColor: "#FFFFFF",
                    position: "relative",
                    height: "40px",
                  }}
                ></Chip>

                <Grid
                  style={{
                    position: "relative",
                    bottom: 0,
                    left: 0,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    left: "115px",
                    top: "-35px",
                  }}
                />
              </Box>

              {appointments
                .filter(
                  (item) =>
                    item.makerNo === user.email && user.role === "Student"
                )
                .filter((item) => item.status >= 2)
                .map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    key={item._id}
                    marginTop={2}
                    alignItems={"center"}
                   //height={"500px"}
                  >
                    {item.status === 2 && (
                      <Card
                        sx={{
                          /*border: "2px solid blue"*/ width: "90%",

                          borderRadius: "15px",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <CardContent>
                          <IconButton
                            type="button"
                            sx={{ p: "10px", left:"200px",top:"-10px" }}
                            aria-label="search"
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography textAlign={"left"}>
                            {item.seeker} accepted the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                    {item.status === 3 && (
                      <Card
                        sx={{
                          /* border: "2px solid blue",*/ width: "90%",
                          borderRadius: "15px",
                          alignItems: "center",
                        }}
                      >
                        <CardContent>
                          <Typography textAlign={"left"}>
                            {item.seeker} rejected the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                    {item.status === 4 && (
                      <Card
                        sx={{
                          /*border: "2px solid blue",*/ width: "90%",
                          borderRadius: "15px",
                          borderLeft: "10px",
                        }}
                      >
                        <CardContent>
                          <Typography textAlign={"left"}>
                            {item.seeker} cancelled the appointment.
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                ))}
              {appointments
                .filter(
                  (item) =>
                    item.seekerNo === user.email &&
                    (user.role === "Instructor" || user.role === "Lecturer")
                )
                .filter((item) => item.status === 1)
                .map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    key={item._id}
                    marginTop={2}
                    alignItems={"center"}
                  >
                    <Card
                      sx={{
                        /*border: "2px solid blue"*/ width: "90%",
                        borderRadius: "15px",
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardContent>
                        <Typography textAlign={"left"}>
                          with {item.maker}
                        </Typography>
                        <Typography textAlign={"left"}>
                          Reason: {item.title}
                        </Typography>
                        <Typography textAlign={"left"}>
                          {DateTime(item.startDate)}
                        </Typography>
                        <Button onClick={() => handleUpdate2(item._id)}>
                          accept
                        </Button>
                        <Button onClick={() => handleUpdate3(item._id)}>
                          delete
                        </Button>
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

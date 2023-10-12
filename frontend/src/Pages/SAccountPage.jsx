import {
  AppBar,
  Box,
  Button,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import MainTopbar from "../Components/MainTopbar";
import { useState, useEffect } from "react";
import { useRef } from "react";
//import { signup, login, logout, useAuth } from "./ImageUpload/firebase";
//import Profile from "./ImageUpload/Profile";
import axios from "axios";
import { apiUrl, comb } from "../config";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

export default function SAccountPage() {
  const buttonStyle = {
    fontsize: "50px",
    margin: " 0px 20px 0px 0px",
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const currentUser = useAuth();
  // const emailRef = useRef();
  // const passwordRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("User");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser.User);
    }
  }, []);

  ///////////////////////////////////
  const [imageUpload, setImageUpload] = useState(null);
  const [userimage, setUserimage] = useState("");

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //console.log(imageRef);
    // uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //     setUserimage(url);
    //     console.log(userimage);
    //     axios.patch(apiUrl+`/api/users/updateImage/${user._id}`, { userimage })
    //             .then((response) => {
    //               console.log(response.data); // Handle successful update

    //               axios
    //                 .get(apiUrl +`/api/users/getOne/${user.email}`)
    //                 .then((res) => {
    //                   //setUser(res.data);
    //                   //console.log("gg");
    //                   let userData = res.data;

    //                   userData.authenticated = true;

    //                   localStorage.setItem('User', JSON.stringify(userData));
    //                   //window.location.reload()
    //                 })
    //                 .catch((err) => {
    //                   alert(err.message);
    //                 });

    //             })
    //             .catch((error) => {
    //               console.error(error); // Handle error
    //             });

    //         });
    // });

    async function updateUserImageWithDelay(imageRef, imageUpload, user) {
      // Upload image and get download URL
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);

      // Set user image and add a delay of 2 seconds (2000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update user image on the server
      try {
        const response = await axios.patch(
          apiUrl + `/api/users/updateImage/${user._id}`,
          { userimage: url }
        );
        console.log(response.data); // Handle successful update

        // Get updated user data
        const res = await axios.get(apiUrl + `/api/users/getOne/${user.email}`);
        let userData = res.data;
        userData.authenticated = true;

        // Store updated user data in local storage
        localStorage.setItem("User", JSON.stringify(userData));
        window.location.reload();
      } catch (error) {
        console.error(error); // Handle error
        alert(error.message);
      }
    }

    // Call the async function with appropriate arguments
    updateUserImageWithDelay(imageRef, imageUpload, user);
  };

  ///////////////////////////

  ///////////change password layout part///////////////

  const [modalOpen, setModalOpen] = useState(false);

  const [modal_Open1, setModalOpen1] = useState(false); /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setVerify(true);
  };

  const toggleModal1 = () => {
    setModalOpen1(!modal_Open1);
    setVerify(true);
  };

  if (modalOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [formData, setFormData] = useState({
    password: "",
    //field2: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);

    // Close the modal after form submission
    toggleModal();
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);

    // Close the modal after form submission
    toggleModal1();
  };

  ///////////////////////////////////////////////

  const [oldPassword, setOldPassword] = useState("");
  const [verify, setVerify] = useState(true);

  ///////verify old password/////////////////////

  const verifyPassword = (e) => {
    e.preventDefault();

    const requestData = {
      email: user.email,
      password: oldPassword,
    };

    //const data = JSON.stringify(requestData);
    //console.log(requestData);

    axios
      .post(apiUrl + "/api/auth/check-password", requestData)
      .then((response) => {
        console.log(response.data.message); // Output the server's response message
        setVerify(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  ///////////////////////////////////////////////////

  ////////////////change password process//////////////

  function mergeObjects(obj1, obj2) {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        obj1[key] = obj2[key];
      }
    }
  }

  function ChangePassword(e) {
    e.preventDefault();
    mergeObjects(user, formData);

    axios
      .put(apiUrl + `/api/users/${user._id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        regNo: user.regNo,
        email: user.email,
        department: user.department,
        telephoneNo: user.telephoneNo,
        role: user.role,
        password: user.password,
        userimage: user.userimage,
      })
      .then((response) => {
        alert("Password changed successfully!"); // Handle successful update
      })
      .catch((error) => {
        console.log(user);
        alert(error.message); // Handle error
      });
    //window.location.reload();
  }

  /////////////////////////////////////////////////////

  if (user == null) {
    return <div>Loading</div>;
  }

  const isStudent = (user && user.role === "Lecturer") || "Instructor";

  ///////////////////////
  // async function handleSignup() {
  //   setLoading(true);
  //   try {
  //     await signup(emailRef.current.value, passwordRef.current.value);
  //   } catch {
  //     alert("Error!");
  //   }
  //   setLoading(false);
  // }

  // async function handleLogin() {
  //   setLoading(true);
  //   try {
  //     await login(emailRef.current.value, passwordRef.current.value);
  //   } catch {
  //     alert("Error!");
  //   }
  //   setLoading(false);
  // }

  // async function handleLogout() {
  //   setLoading(true);
  //   try {
  //     await logout();
  //   } catch {
  //     alert("Error!");
  //   }
  //   setLoading(false);
  // }

  ////////////////////////

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <MainTopbar />
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Toolbar />
          <Grid container spacing={0}>
            <Grid
              item
              xs={4}
              md={3}
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: "100%", height: "auto" }}>
                  <Toolbar />
                  <div>
                    <img
                      src={user.userimage}
                      alt="LectureImg"
                      style={{ width: "254px", height: "276px" }}
                    />
                  </div>
                  <div className="App">
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                    <button onClick={uploadFile}> Upload Image</button>
                  </div>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8} md={9}>
              <Box p={2}>
                <CardContent>
                  <Toolbar />
                  <Stack direction="row" spacing={4}>
                    <Chip
                      label="Name"
                      sx={{ fontSize: "1.0rem", width: "25%" }}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "#C5ECF1",
                        fontSize: "1.0rem",
                        width: "50%",
                      }}
                      label={
                        <Stack direction="row" spacing={1}>
                          {user.fullName}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    flexGrow={1}
                    sx={{ height: 10 }}
                  ></Stack>

                  <Stack direction="row" spacing={4}>
                    <Chip
                      label="Registration No."
                      sx={{ fontSize: "1.0rem", width: "25%" }}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "#C5ECF1",
                        fontSize: "1.0rem",
                        width: "50%",
                      }}
                      label={
                        <Stack direction="row" spacing={1}>
                          {user.regNo}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    flexGrow={1}
                    sx={{ height: 10 }}
                  ></Stack>

                  <Stack direction="row" spacing={4}>
                    <Chip
                      label="Student Mail"
                      sx={{ fontSize: "1.0rem", width: "25%" }}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "#C5ECF1",
                        fontSize: "1.0rem",
                        width: "50%",
                      }}
                      label={
                        <Stack direction="row" spacing={1}>
                          {user.email}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    flexGrow={1}
                    sx={{ height: 10 }}
                  ></Stack>

                  <Stack direction="row" spacing={4}>
                    <Chip
                      label="Department"
                      sx={{ fontSize: "1.0rem", width: "25%" }}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "#C5ECF1",
                        fontSize: "1.0rem",
                        width: "50%",
                      }}
                      label={
                        <Stack direction="row" spacing={1}>
                          {user.department}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    flexGrow={1}
                    sx={{ height: 10 }}
                  ></Stack>

                  <Stack direction="row" spacing={4}>
                    <Chip
                      label="Contact No."
                      sx={{ fontSize: "1.0rem", width: "25%" }}
                    />
                    <Chip
                      sx={{
                        backgroundColor: "#C5ECF1",
                        fontSize: "1.0rem",
                        width: "50%",
                      }}
                      label={
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "center", textAlign: "left" }}
                        >
                          {user.telephoneNo}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack
                    direction={"row"}
                    flexGrow={1}
                    sx={{ height: 30 }}
                  ></Stack>

                  {isStudent && (
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      flexGrow={1}
                      sx={{ height: 30, width: "77%" }}
                    >
                      <a href="/grp19/Schedular">
                        <Button variant="contained" sx={{ width: "100%" }}>
                          Schedule
                        </Button>
                      </a>
                    </Stack>
                  )}
                </CardContent>
              </Box>

              <Button
                color="primary"
                onClick={toggleModal}
                borderLeft="10px"
                variant="contained"
                sx={{
                  width: 200,
                  backgroundColor: "#46B7C7",
                  left: "590px",
                }}
              >
                Change Password
              </Button>

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
                  <Typography variant="h4" id="modal-title">
                    Change Password
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    {/* Input fields for your form */}

                    <Typography
                      sx={{
                        top: "1px",
                      }}
                    >
                      {" Enter your old paaword"}
                    </Typography>


                    <TextField
                      label="Old Password"
                      name="oldpassword"
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                   <Typography
                      sx={{
                        top: "1px",
                      }}
                    >
                      {" Enter your new paaword"}
                    </Typography>
                    <TextField
                      label="New Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      disabled={verify}
                    />
                    {/* Add more input fields as needed */}

                    <Button onClick={verifyPassword}>verify</Button>

                    {/* Submit button */}
                    <Button
                      onClick={ChangePassword}
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        top: "38px",
                        left: "190px",
                      }}
                    >
                      Submit
                    </Button>
                  </form>
                  <Button onClick={toggleModal} variant="contained">
                    CLOSE
                  </Button>
                </Box>
              </Modal>

              {/* /////////////////////////////*/}

              <Button
                color="primary"
                onClick={toggleModal1}
                borderLeft="1px"
                variant="contained"
                sx={{
                  width: 200,
                  backgroundColor: "#46B7C7",
                  left: "100px",
                }}
              >
                Change Details
              </Button>

              <Modal
                open={modal_Open1}
                onClose={toggleModal1}
                aria-labelledby="modal-title1"
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
                  <Typography variant="h4" id="modal-title1">
                    Change Details
                  </Typography>
                  <form onSubmit={handleSubmit1}>
                    {/* Input fields for your form */}
                    <TextField
                      label="Full name"
                      // name="oldpassword"
                      // value={oldPassword}
                      // onChange={(e)=> {setOldPassword(e.target.value);}}
                      // fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Telephone number"
                      // name="password"
                      // value={formData.password}
                      // onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      label="Email"
                      // name="oldpassword"
                      // value={oldPassword}
                      // onChange={(e)=> {setOldPassword(e.target.value);}}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    {/* Add more input fields as needed */}

                    <Button
                      sx={{
                        top: "35px",
                        left: "250px",
                      }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </form>
                  <Button onClick={toggleModal1} variant="contained">
                    CLOSE
                  </Button>
                </Box>
              </Modal>

              {/* /////////////////////////////*/}
            </Grid>
          </Grid>
        </Box>
        <Stack direction={"row"} height={100}></Stack>

        <Divider />

        <Stack
          direction={"row"}
          flexGrow={1}
          alignItems="center"
          justifyContent="flex-start"
          spacing={30}
          sx={{ bgcolor: "" }}
        >
          <Typography width={500}>
            The Faculty of Engineering of University of Ruhuna was established
            on 1st July 1999 at Hapugala, Galle. Admission to the Faculty of
            Engineering, University of Ruhuna, is subject to the University
            Grants Commission policy on university admissions.
          </Typography>
          <Typography>
            <List>
              <ListItem variant="h5" gutterBottom>
                DEPARTMENTS
              </ListItem>
              <ListItem>Civil and Environmental Engineering</ListItem>
              <ListItem>Electrical and Information Engineering</ListItem>
              <ListItem>Mechanical and Manufacturing Engineering</ListItem>
              <ListItem>Interdisciplinary Studies</ListItem>
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
              <ListItem>Phone: +(94)0 91 2245765/6</ListItem>
              <ListItem>E-mail: webmaster@eng.ruh.ac.lk</ListItem>
            </List>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

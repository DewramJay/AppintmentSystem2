import { AppBar, Box, Button, Card, CardActionArea,Grid, CardContent, CssBaseline, Divider, List, ListItem, Stack, Toolbar, Typography } from "@mui/material";


import AdminTopbar from "../../Components/AdminTopbar"



export default function LoginPage () {

  const buttonStyle = {
   
  
    border: 'none',
    borderRadius: '50px',
    padding: '12px 600px',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '150px'
   
  };


    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <AdminTopbar/>      
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
             <CardContent >
                  <Typography gutterBottom variant="h3" component="div" textAlign={"left"} color="#063970" >
                      Accounts
                  </Typography>
              </CardContent>

              {/* */}
              
              <div>
                
              <Stack spacing={2} direction="row" sx={{ width: '450' }} alignItems={"left"}>
                <a href ="/AddStudent" ><Button variant='contained' style={buttonStyle} sx={{ width: 500 , alignItems:"left",textalignment:"left", backgroundColor:"#46B7C7"}}>Add one user</Button></a>  
              </Stack>
              </div>
            {/* <div>
            <Stack spacing={2} direction="row" sx={{ width: '450' }} alignItems={"left"}>
                <a href ="/AdminInstructors" ><Button variant='contained' style={buttonStyle} sx={{ width: 500 , alignItems:"left",textalignment:"left", backgroundColor:"#46B7C7"}}>instructors</Button></a>  
              </Stack>
            </div>

              <div>
              <Stack spacing={2} direction="row" sx={{ width: '450' }} alignItems={"left"}>
                <a href ="/AdminStudent" ><Button variant='contained' style={buttonStyle} sx={{ width: 500 , alignItems:"left",textalignment:"left", backgroundColor:"#46B7C7"}}>Students</Button></a>  
              </Stack>
              </div> */}

              <div>
              <Stack spacing={2} direction="row" sx={{ width: '450' }} alignItems={"left"}>
                <a href ="/Exceldata" ><Button variant='contained' style={buttonStyle} sx={{ width: 50 , alignItems:"left",textalignment:"left", backgroundColor:"#46B7C7"}}>Add many users</Button></a>  
              </Stack>
              </div>
             
              <Stack direction = {'row'} height={100}></Stack> 

            
              <Divider />
                <Box
                  sx={{
                    backgroundColor: "#198897",
                    padding: 0.5,
                    marginTop: 5,
                    borderRadius: "10px",
                  }}
                ></Box>
                <Divider />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    padding: 2,
                    marginTop: 5,
                    borderRadius: "10px",
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <List>
                      <ListItem variant="h6" gutterBottom>
                        <Typography variant="h5">INFORMATION</Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body1">
                          The Faculty of Engineering of the University of Ruhuna
                          was established on 1st July 1999 at Hapugala, Galle.
                          Admission to the Faculty of Engineering, University of
                          Ruhuna, is subject to the University Grants Commission
                          policy on university admissions.
                        </Typography>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <List>
                      <ListItem variant="h6" gutterBottom>
                        <Typography variant="h5">DEPARTMENTS</Typography>
                      </ListItem>
                      <ListItem>Civil and Environmental Engineering</ListItem>
                      <ListItem>
                        Electrical and Information Engineering
                      </ListItem>
                      <ListItem>
                        Mechanical and Manufacturing Engineering
                      </ListItem>
                      <ListItem>Interdisciplinary Studies</ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <List>
                      <ListItem variant="h6" gutterBottom>
                        <Typography variant="h5">CONTACT US</Typography>
                      </ListItem>
                      <ListItem>
                        Faculty of Engineering, Hapugala, Galle, Sri Lanka.
                      </ListItem>
                      <ListItem>Phone: +(94) 91 2245765/6</ListItem>
                      <ListItem>E-mail: webmaster@eng.ruh.ac.lk</ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
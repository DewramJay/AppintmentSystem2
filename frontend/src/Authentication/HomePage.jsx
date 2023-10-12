import {
  AppBar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import LoginTopbar from "../Components/LoginTopbar";
import { lightBlue } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <LoginTopbar />
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Toolbar />

          <Box sx={{ flexGrow: 1, maxWidth: 2000, height: 850 }}>
            <Card sx={{ maxWidth: 2000, height: 850 }}>
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    textAlign="center"
                    color="#063970"
                  >
                    Faculty of Engineering - Appointment Management System
                  </Typography>
                </CardContent>
                <CardMedia
                  sx={{ height: 350, maxWidth: 800, margin: "auto" }}
                  image="data:image/jpeg;base64,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"
                />
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
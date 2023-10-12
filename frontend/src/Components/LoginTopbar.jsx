import { AppBar, Avatar, Box, Button, styled, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 75,
  //backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg)',
  backgroundSize: 'cover',
  //filter: 'grayscale(100%)', // Convert image to grayscale
  border: '2px solid white', // Add a border to create a separation effect
  borderRadius:'25px',
}));

export default function LoginTopbar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor:'#198897'}}>
          <Toolbar>
          <Stack direction = {'row'} flexGrow = {1} alignItems="center" justifyContent="flex-start" spacing={5}>
            <StyledAvatar src="https://upload.wikimedia.org/wikipedia/en/6/65/LOGO_OF_RUHUNA.jpg"  sx={{ width: 56, height: 75 }} variant="square"/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign:"revert-layer" }}>
                

              
                      UNIVERSITY OF RUHUNA
             
                </Typography>
                <Stack spacing={1} direction="row">
                <a href ="/grp19/login" ><Button variant="Text">You are not logging (Login)</Button></a>  
                    
                </Stack>
          </Stack> 
         </Toolbar>
        </AppBar>
      </Box>
    );
  }
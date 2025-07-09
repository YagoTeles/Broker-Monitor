import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function AppBarMenu({iconeMenu}) {

  return (
    <AppBar position="static">
        
      <Container maxWidth="x2">
        <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Broker Monitor
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
          </Box>
          <Typography
            variant="h7"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 250,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Broker Monitor
          </Typography>
        {iconeMenu}    
        </Toolbar>
        
      </Container>
      
    </AppBar>
  );
}
export default AppBarMenu;

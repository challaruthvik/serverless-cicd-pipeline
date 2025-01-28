import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CI/CD Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/deployments')}>Deployments</Button>
          <Button color="inherit" onClick={() => navigate('/monitoring')}>Monitoring</Button>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
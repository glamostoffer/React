import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get('access');
  const role = Cookies.get('role');

  const handleLogout = () => {
    Cookies.remove('access');
    Cookies.remove('role');
    navigate('/login');

  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chat Application
        </Typography>
        {token && <Button color="inherit" component={Link} to="/chat">Chat</Button>}
        {role === 'admin' && <Button color="inherit" component={Link} to="/users">Users</Button>}
        {token && <Button color="inherit" component={Link} to="/create-chat">Create Chat</Button>}
        {token && <Button color="inherit" component={Link} to="/profile">Profile</Button>}
        {token && <Button color="inherit" component={Link} to="/add-user-to-chat">Add User to Chat</Button>}
        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

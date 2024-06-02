import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inviteToken, setInviteToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username && password) {
      const endpoint = inviteToken
        ? 'http://localhost:8080/admin/sign-up'
        : 'http://localhost:8080/sign-up';
      const payload = inviteToken
        ? { login: username, password: password, inviteToken: inviteToken }
        : { login: username, password: password };

      try {
        const response = await axios.post(endpoint, payload);

        if (response.status === 200) {
          navigate('/login');
        } else {
          setError('Invalid registration data');
        }
      } catch (error) {
        setError('Invalid registration data');
      }
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '300px' }}>
        <Typography variant="h5" component="div" gutterBottom>
          Register
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Invite Token (optional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inviteToken}
          onChange={(e) => setInviteToken(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default RegisterPage;

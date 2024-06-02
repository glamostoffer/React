import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, TextField, Avatar, Box, Button, Alert } from '@mui/material';
import { format } from 'date-fns';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [user, setUser] = useState({
    login: '',
    role: '',
    createdAt: 0,
    updatedAt: 0,
  });
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('access');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.post('http://localhost:8080/client/details/get', {}, {
          withCredentials: true,
        });

        const { login, role, createdAt, updatedAt } = response.data;
        setUser({ login, role, createdAt, updatedAt });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangeLogin = (event) => {
    setNewLogin(event.target.value);
  };

  const handleChangePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp * 1000), 'dd/MM/yyyy HH:mm:ss');
  };

  const handleUpdate = async () => {
    try {
      const token = Cookies.get('access');
      if (!token) {
        throw new Error('No access token found');
      }

      let payload = {};
      if (newLogin) payload.login = newLogin;
      if (newPassword) payload.password = newPassword;

      const response = await axios.post('http://localhost:8080/client/details/update', payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUpdateStatus('Profile updated successfully');
        setUser((prevState) => ({
          ...prevState,
          login: newLogin || prevState.login,
        }));
        setNewLogin('');
        setNewPassword('');
      } else {
        setUpdateStatus('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setUpdateStatus('Error updating profile');
    }
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" mt={5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
              <Avatar sx={{ width: 100, height: 100 }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>
            <TextField
              label="Login"
              value={user.login}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Role"
              value={user.role}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Created At"
              value={formatDate(user.createdAt)}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Updated At"
              value={formatDate(user.updatedAt)}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Update Profile
              </Typography>
              <TextField
                label="New Login"
                value={newLogin}
                onChange={handleChangeLogin}
                fullWidth
                margin="normal"
              />
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={handleChangePassword}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
                Update
              </Button>
              {updateStatus && (
                <Box mt={2}>
                  <Alert severity={updateStatus === 'Profile updated successfully' ? 'success' : 'error'}>
                    {updateStatus}
                  </Alert>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

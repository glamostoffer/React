import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Paper, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Alert } from '@mui/material';
import Cookies from 'js-cookie';

const AddUserToChatPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState('');
  const [clientLogin, setClientLogin] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const token = Cookies.get('access');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.post('http://localhost:8080/chat/room/get', {}, {
          withCredentials: true,
        });

        setChatRooms(response.data.items);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  const handleAddUserToChat = async () => {
    try {
      const token = Cookies.get('access');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.post('http://localhost:8080/chat/room/add', {
        roomID: selectedChatRoom,
        clientLogin,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setStatus('User added successfully');
      } else {
        setStatus('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user to chat:', error);
      setStatus('Failed to add user');
    }
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" mt={5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom>
              Add User to Chat
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="chat-room-select-label">Select Chat Room</InputLabel>
              <Select
                labelId="chat-room-select-label"
                value={selectedChatRoom}
                onChange={(e) => setSelectedChatRoom(e.target.value)}
              >
                {chatRooms.map((room) => (
                  <MenuItem key={room.roomID} value={room.roomID}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="User Login"
              value={clientLogin}
              onChange={(e) => setClientLogin(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddUserToChat} fullWidth>
              Add User
            </Button>
            {status && (
              <Box mt={2}>
                <Alert severity={status === 'User added successfully' ? 'success' : 'error'}>
                  {status}
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddUserToChatPage;

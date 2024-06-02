import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateChatPage = () => {
  const [chatName, setChatName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateChat = async () => {
    try {
      const token = Cookies.get('access');
      const response = await axios.post('http://localhost:8080/chat/room/create', {
        name: chatName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        navigate('/chat');
      } else {
        setError('Failed to create chat');
      }
    } catch (error) {
      setError('Failed to create chat');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '300px' }}>
        <Typography variant="h5" component="div" gutterBottom>
          Create Chat
        </Typography>
        <TextField
          label="Chat Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateChat}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CreateChatPage;

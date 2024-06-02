import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box display="flex" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ ml: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;

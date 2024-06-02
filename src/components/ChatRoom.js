import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import MessageInput from './MessageInput';
import { useWebSocket } from '../hooks/useWebSocket';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatRoom = ({ room }) => {
  const [messages, setMessages] = useState( []);
  const { sendMessage, addListener, removeListener } = useWebSocket();

  useEffect(() => { 
    
    const getMsgs = async () => {
    try {
      const token = Cookies.get('access');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.post('http://localhost:8080/chat/msg/get', {roomID: room.roomID}, {
        withCredentials: true,
      });

      setMessages(response.data.items);
    }catch (e) {
      console.log(e);
      setMessages([]);
    }
 }
  getMsgs()
 
}, [ room.roomID ]);

  useEffect(() => {
    const handleMessage = (message) => {
      if (message.roomID === room.roomID) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    addListener(handleMessage);
    return () => {
      removeListener(handleMessage);
    };
  }, [room.roomID, addListener, removeListener]);

  const handleSendMessage = (messageText) => {
    const message = { roomID: room.roomID, content: messageText, username: 'You' };
    // setMessages((prevMessages) => [...prevMessages, message]);
    sendMessage(message);
  };

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        {room.name}
      </Typography>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.content} secondary={message.username} />
          </ListItem>
        ))}
      </List>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;

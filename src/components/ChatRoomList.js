import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, CircularProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = Cookies.get('access');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await axios.post('http://localhost:8080/chat/room/get', {}, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setRooms(response.data.items);
        } else {
          setError('Failed to fetch chat rooms');
        }
      } catch (error) {
        setError('Failed to fetch chat rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Chat Rooms
      </Typography>
      <List>
        {rooms.map((room) => (
          <ListItem button key={room.roomID} onClick={() => onSelectRoom(room)}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={room.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatRoomList;

import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, Paper, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [banError, setBanError] = useState('');
  const role = Cookies.get('role');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('access');
        if (!token || role !== 'admin') {
          throw new Error('Unauthorized');
        }

        const response = await axios.post('http://localhost:8080/admin/get-list-of-users', {
          limit: 10,
          offset: 0
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        if (response.status === 200) {
          setUsers(response.data.items);
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  const handleBan = async (userId) => {
    try {
      const token = Cookies.get('access');
      const response = await axios.post('http://localhost:8080/admin/ban-user', {
        userID: userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        // Optional: Remove the banned user from the list or fetch the updated list
        setUsers(users.filter(user => user.id !== userId));
        setBanError('');
      } else {
        setBanError('Failed to ban user');
      }
    } catch (error) {
      setBanError('Failed to ban user');
    }
  };

  if (role !== 'admin') {
    return <Typography color="error">Access Denied</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
        <Typography variant="h5" component="div" gutterBottom>
          User List
        </Typography>
        {banError && <Typography color="error">{banError}</Typography>}
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.login} secondary={`Role: ${user.role}`} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBan(user.id)}
                >
                  Ban
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UserListPage;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';
// import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import UserListPage from './components/UserListPage';
import CreateChatPage from './components/CreateChatPage';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AddUserToChatPage from './components/AddUserToChatPage';

const initialRooms = [
  { id: 1, name: 'General', messages: [{ sender: 'User1', text: 'Hello!' }, { sender: 'User2', text: 'Hi!' }] },
  { id: 2, name: 'Random', messages: [{ sender: 'User3', text: 'Random message' }] },
];

const App = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleLogin = (username) => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/users" element={isAuthenticated ? <UserListPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? (
          <Container>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <ChatRoomList rooms={rooms} onSelectRoom={handleSelectRoom} />
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  {selectedRoom ? (
                    <ChatRoom room={selectedRoom} />
                  ) : (
                    <Typography variant="h6" component="div">
                      Select a chat room to start chatting
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/create-chat" element={<CreateChatPage />} />
        <Route path="*" element={<Navigate to="/chat" />} />
        <Route path="/add-user-to-chat" element={isAuthenticated ? <AddUserToChatPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              Photo App
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          {/* Left sidebar for UserList */}
          <Box sx={{ width: 250, flexShrink: 0, borderRight: '1px solid #e0e0e0' }}>
            <UserList />
          </Box>
          
          {/* Main content area */}
          <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
            <Routes>
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
              <Route path="/" element={<Typography variant="h5">Welcome to Photo App! Select a user from the list.</Typography>} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
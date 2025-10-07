// src/components/auth/AdminRoute.js - FIXED VERSION
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AdminRoute({ children }) {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not logged in at all
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ p: 3 }}
      >
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="body1">
              You do not have administrator privileges to access this page.
            </Typography>
          </Alert>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Only administrators can access the admin panel. If you believe you should have admin access, please contact the system administrator.
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => window.history.back()}
            sx={{ mr: 2 }}
          >
            Go Back
          </Button>
          
          <Button 
            variant="outlined" 
            href="/"
          >
            Go to Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  // User is admin, allow access
  return children;
}
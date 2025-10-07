// src/pages/Admin.js - Campus Sustainability Admin Panel
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import {
  Button, Box, Typography, Container, Alert, Snackbar,
  Card, CardContent, CardHeader, Grid, Divider, Paper,
  List, ListItem, ListItemText, ListItemIcon, Chip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function Admin() {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage(`Error fetching users: ${error.message}`);
      setSeverity('error');
      setShowAlert(true);
    }
  };

  // Function to make current user an admin
  const makeUserAdmin = async () => {
    try {
      const userEmail = 'brandon.cooley@live.com';
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);

      let userId = null;
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.email && userData.email.toLowerCase() === userEmail.toLowerCase()) {
          userId = doc.id;
        }
      });

      if (userId) {
        await updateDoc(doc(db, 'users', userId), {
          role: 'admin'
        });
        setMessage(`User ${userEmail} is now an admin. Please log out and log back in.`);
        setSeverity('success');
        setShowAlert(true);
        fetchUsers();
      } else {
        setMessage(`User ${userEmail} not found. Please register with this email first.`);
        setSeverity('warning');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error making user admin:', error);
      setMessage(`Error making user admin: ${error.message}`);
      setSeverity('error');
      setShowAlert(true);
    }
  };

  return (
    <MainLayout title="Admin Panel">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Campus Sustainability Admin Panel
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Admin Access Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                avatar={<SettingsIcon color="primary" />}
                title="Admin Access Control"
                subheader="Manage administrator privileges"
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Grant admin access to brandon.cooley@live.com
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={makeUserAdmin}
                  startIcon={<CheckCircleIcon />}
                >
                  Make User Admin
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* System Information Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                avatar={<StorageIcon color="success" />}
                title="System Information"
                subheader="Dashboard configuration and status"
              />
              <Divider />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText
                      primary="Firebase Backend"
                      secondary="Connected and operational"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText
                      primary="3D Campus Viewer"
                      secondary="Active with GLTF model"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                    <ListItemText
                      primary="Sustainability Data"
                      secondary="Real-time metrics available"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* User Management Card */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                avatar={<PeopleIcon color="info" />}
                title="Registered Users"
                subheader={`Total users: ${users.length}`}
              />
              <Divider />
              <CardContent>
                {users.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No users registered yet
                  </Typography>
                ) : (
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <List>
                      {users.map((user) => (
                        <ListItem key={user.id}>
                          <ListItemText
                            primary={user.email}
                            secondary={`Role: ${user.role || 'user'}`}
                          />
                          <Chip
                            label={user.role === 'admin' ? 'Admin' : 'User'}
                            color={user.role === 'admin' ? 'primary' : 'default'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Dashboard Features Info */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Dashboard Features"
                subheader="Available sustainability monitoring tools"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">Solar Energy</Typography>
                      <Typography variant="body2">Roof potential tracking</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="info.main">Water Conservation</Typography>
                      <Typography variant="body2">Rainwater harvesting</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="success.main">Green Spaces</Typography>
                      <Typography variant="body2">Carbon offset analysis</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" color="warning.main">Study Pods</Typography>
                      <Typography variant="body2">Efficiency metrics</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alert snackbar */}
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity={severity} onClose={() => setShowAlert(false)}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </MainLayout>
  );
}

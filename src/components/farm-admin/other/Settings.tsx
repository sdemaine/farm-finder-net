import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Switch, FormControlLabel } from '@mui/material';

// Example user and farm data fetching function (replace with actual API call)
const fetchUserData = () => ({
  name: 'John Doe',
  email: 'johndoe@example.com',
});

const fetchFarmSettings = () => ({
  notificationsEnabled: true,
  darkMode: false,
});

// Example functions for saving data (replace with actual API calls)
const saveUserData = (userData: any) => {
  console.log('Saving user data:', userData);
};

const saveFarmSettings = (settings: any) => {
  console.log('Saving farm settings:', settings);
};

const Settings = () => {
  // User info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Farm settings
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Fetch initial data when component mounts
  React.useEffect(() => {
    const userData = fetchUserData();
    setName(userData.name);
    setEmail(userData.email);

    const farmSettings = fetchFarmSettings();
    setNotificationsEnabled(farmSettings.notificationsEnabled);
    setDarkMode(farmSettings.darkMode);
  }, []);

  // Save functions for user and farm settings
  const handleSaveUserData = () => {
    const userData = { name, email };
    saveUserData(userData);
    alert('User information saved successfully!');
  };

  const handleSaveFarmSettings = () => {
    const settings = { notificationsEnabled, darkMode };
    saveFarmSettings(settings);
    alert('Farm settings saved successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Settings
      </Typography>

      {/* User Information Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Personal Information</Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveUserData}>
                Save Personal Information
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Farm Settings Section */}
      <Box>
        <Typography variant="h6">Farm Settings</Typography>
        <Paper sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                }
                label="Enable Notifications"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                }
                label="Enable Dark Mode"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveFarmSettings}>
                Save Farm Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Settings;

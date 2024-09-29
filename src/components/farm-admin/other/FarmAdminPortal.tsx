import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tabs, Tab, AppBar, Toolbar, Paper } from '@mui/material';
import FarmList from './FarmList';
import AddFarm from './AddFarm';
import EditFarm from './EditFarm';
import ProductManagement from './ProductManagement';
import SubscriptionManagement from './SubscriptionManagement';
import Settings from './Settings';

const FarmAdminPortal = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        navigate('farms');
        break;
      case 1:
        navigate('products');
        break;
      case 2:
        navigate('subscriptions');
        break;
      case 3:
        navigate('settings');
        break;
      default:
        navigate('farms');
    }
  };

  return (
    <>
    Test
    <Box>
      {/* AppBar with Navigation Tabs */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Farm Owner Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Tabs for Navigation */}
      <Paper>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Farms" />
          <Tab label="Products" />
          <Tab label="Subscriptions" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {/* Content Routes */}
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="farms" />} />
          <Route path="farms" element={<FarmList />} />
          <Route path="farms/add" element={<AddFarm />} />
          <Route path="farms/edit/:id" element={<EditFarm />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="subscriptions" element={<SubscriptionManagement />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Container>
    </Box>
    </>
  );
};

export default FarmAdminPortal;

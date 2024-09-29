import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@mui/material';

// Example subscription plans fetching function (replace with actual API call)
const fetchSubscriptionPlans = () => {
  return [
    { id: '1', name: 'Basic Plan', price: 10, benefits: ['Basic features', 'Listed in directory'] },
    { id: '2', name: 'Premium Plan', price: 25, benefits: ['Priority listing', 'Enhanced metrics', 'All Basic features'] },
    { id: '3', name: 'Enterprise Plan', price: 50, benefits: ['Custom branding', 'Dedicated support', 'All Premium features'] },
  ];
};

// Example current subscription fetching function (replace with actual API call)
const fetchCurrentSubscription = () => {
  return { id: '2', name: 'Premium Plan', price: 25 };
};

// Example function to handle subscription change (replace with actual API call)
const changeSubscriptionPlan = (planId: string) => {
  console.log(`Switching to subscription plan ${planId}`);
};

const SubscriptionList = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  useEffect(() => {
    const fetchedPlans = fetchSubscriptionPlans();
    const fetchedCurrentSubscription = fetchCurrentSubscription();
    setPlans(fetchedPlans);
    setCurrentSubscription(fetchedCurrentSubscription);
  }, []);

  const openDialog = (plan: any) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPlan(null);
  };

  const handleChangeSubscription = () => {
    if (selectedPlan) {
      changeSubscriptionPlan(selectedPlan.id);
      setCurrentSubscription(selectedPlan); // Update current subscription in UI
      closeDialog();
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Subscription Plans
      </Typography>

      {currentSubscription && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Current Subscription:</Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">{currentSubscription.name}</Typography>
            <Typography>${currentSubscription.price}/month</Typography>
          </Paper>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Available Plans:
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{plan.name}</Typography>
              <Typography>${plan.price}/month</Typography>
              <ul>
                {plan.benefits.map((benefit: any, index: any) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => openDialog(plan)}
                disabled={currentSubscription && currentSubscription.id === plan.id}
              >
                {currentSubscription && currentSubscription.id === plan.id ? 'Current Plan' : 'Select'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Confirming Subscription Change */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Change Subscription Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to switch to the <strong>{selectedPlan?.name}</strong> plan? This will cost ${selectedPlan?.price}/month.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangeSubscription} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionList;

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

// Simulated subscription plans data (replace with actual API call)
const fetchSubscriptionPlans = () => {
  return [
    { id: '1', name: 'Basic Plan', price: 10, benefits: ['Basic metrics', 'Listed in directory'] },
    { id: '2', name: 'Premium Plan', price: 25, benefits: ['All Basic Plan features', 'Priority listing', 'Enhanced metrics'] },
    { id: '3', name: 'Enterprise Plan', price: 50, benefits: ['All Premium Plan features', 'Dedicated support', 'Custom branding'] },
  ];
};

// Simulated current subscription data (replace with actual API call)
const fetchCurrentSubscription = () => {
  return { id: '2', name: 'Premium Plan', price: 25 };
};

// Simulated subscription update function (replace with actual API call)
const updateSubscription = (planId: string) => {
  console.log(`Updating subscription to plan ${planId}`);
};

const SubscriptionManagement = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  useEffect(() => {
    // Fetch subscription plans and current subscription when component mounts
    const plansData = fetchSubscriptionPlans();
    const currentSubscriptionData = fetchCurrentSubscription();
    setPlans(plansData);
    setCurrentSubscription(currentSubscriptionData);
  }, []);

  const openDialog = (plan: any) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPlan(null);
  };

  const handleUpdateSubscription = () => {
    if (selectedPlan) {
      updateSubscription(selectedPlan.id);
      setCurrentSubscription(selectedPlan); // Update UI after changing the plan
      closeDialog();
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Subscription Management
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
        Available Subscription Plans:
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={6} key={plan.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{plan.name}</Typography>
              <Typography>${plan.price}/month</Typography>
              <ul>
                {plan.benefits.map((benefit: string, index: number) => (
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
          <Button onClick={handleUpdateSubscription} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManagement;

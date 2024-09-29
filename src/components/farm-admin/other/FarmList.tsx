import { Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FarmList = () => {
  const navigate = useNavigate();

  // Sample data (this would be fetched from the database)
  const farms = [
    { id: 1, name: 'Green Valley Farm', city: 'Townsville', state: 'NH' },
    { id: 2, name: 'Sunny Farms', city: 'Sunnydale', state: 'VT' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Your Farms</Typography>

      <Button variant="contained" color="primary" onClick={() => navigate('add')}>
        Add New Farm
      </Button>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {farms.map((farm) => (
          <Grid item xs={12} md={6} key={farm.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{farm.name}</Typography>
              <Typography>{farm.city}, {farm.state}</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => navigate(`edit/${farm.id}`)}
              >
                Edit Farm
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FarmList;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

// Example farm data fetching function (replace with actual API call)
const fetchFarmById = (id: string) => {
  // Simulating an API response
  const farms = [
    { id: '1', name: 'Green Valley Farm', city: 'Townsville', state: 'NH' },
    { id: '2', name: 'Sunny Farms', city: 'Sunnydale', state: 'VT' },
  ];
  return farms.find((farm) => farm.id === id);
};

// Example farm updating function (replace with actual API call)
const updateFarm = (id: string, updatedFarm: any) => {
  console.log(`Updating farm with id ${id}:`, updatedFarm);
};

const EditFarm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Fetch farm details when component mounts
  useEffect(() => {
    if (id) {
      const farm = fetchFarmById(id);
      if (farm) {
        setName(farm.name);
        setCity(farm.city);
        setState(farm.state);
      }
    }
  }, [id]);

  const handleSubmit = () => {
    if (id) {
      const updatedFarm = { name, city, state };
      updateFarm(id, updatedFarm);
      navigate('/farms');
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Edit Farm</Typography>
      <TextField
        label="Farm Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Save Changes
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/farms')} sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditFarm;

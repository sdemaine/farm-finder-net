import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFarm = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you would typically handle the form submission logic, such as making a POST request to your server
    console.log('Farm submitted:', { name, city, state });
    navigate('/farms');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Add New Farm</Typography>
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
        Submit
      </Button>
    </Box>
  );
};

export default AddFarm;

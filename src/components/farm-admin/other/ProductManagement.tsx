import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Sample products fetching function (replace with actual API call)
const fetchProducts = (farmId: string) => {
  // Simulated API data
  return [
    { id: '1', name: 'Tomatoes', description: 'Fresh organic tomatoes', price: 2.5 },
    { id: '2', name: 'Cucumbers', description: 'Crisp cucumbers', price: 1.5 },
  ];
};

// Sample product adding function (replace with actual API call)
const addProduct = (farmId: string, product: any) => {
  console.log(`Adding product to farm ${farmId}:`, product);
};

// Sample product updating function (replace with actual API call)
const updateProduct = (productId: string, updatedProduct: any) => {
  console.log(`Updating product with id ${productId}:`, updatedProduct);
};

// Sample product deleting function (replace with actual API call)
const deleteProduct = (productId: string) => {
  console.log(`Deleting product with id ${productId}`);
};

const ProductManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const farmId = '1'; // Example farmId, replace with actual farm ID logic
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products for the farm when the component mounts
    const productsData = fetchProducts(farmId);
    setProducts(productsData);
  }, [farmId]);

  const openDialog = (product: any = null) => {
    setIsDialogOpen(true);
    if (product) {
      setSelectedProduct(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setIsEditing(true);
    } else {
      resetForm();
      setIsEditing(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setSelectedProduct(null);
  };

  const handleSaveProduct = () => {
    const product = { name, description, price };
    if (isEditing && selectedProduct) {
      updateProduct(selectedProduct.id, product);
    } else {
      addProduct(farmId, product);
    }
    closeDialog();
    // Refresh product list after save (in real app, fetch updated products)
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    // Refresh product list after delete (in real app, fetch updated products)
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => openDialog()}>
        Add New Product
      </Button>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>${product.price.toFixed(2)}</Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => openDialog(product)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Adding/Editing Products */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing ? 'Update the product details below.' : 'Enter the details of the new product.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            {isEditing ? 'Save Changes' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;

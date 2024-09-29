import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Example product fetching function (replace with actual API call)
const fetchProducts = (farmId: string) => {
  return [
    { id: '1', name: 'Tomatoes', description: 'Fresh organic tomatoes', price: 2.5 },
    { id: '2', name: 'Cucumbers', description: 'Crisp cucumbers', price: 1.5 },
    { id: '3', name: 'Carrots', description: 'Organic carrots', price: 1.0 },
  ];
};

// Example product deletion function (replace with actual API call)
const deleteProduct = (productId: string) => {
  console.log(`Deleting product with id ${productId}`);
};

const ProductList = () => {
  const farmId = '1'; // Example farm ID, replace with actual logic to get farm ID
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products when component mounts
    const fetchedProducts = fetchProducts(farmId);
    setProducts(fetchedProducts);
  }, [farmId]);

  const openDeleteDialog = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      closeDeleteDialog();
    }
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product List
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddProduct}>
        Add New Product
      </Button>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} key={product.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.description}</Typography>
              <Typography>${product.price.toFixed(2)}</Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => handleEditProduct(product.id)}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
                onClick={() => openDeleteDialog(product)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Confirming Product Deletion */}
      <Dialog open={isDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the product <strong>{selectedProduct?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;

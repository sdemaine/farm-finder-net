import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { fetchGlobalProducts, addProduct, updateProduct, deleteProduct } from '@/services/product-service';
import { Product } from '@/types/Products';



const GlobalProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '' });
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    // Fetch products when component mounts
    const fetchProducts = async () => {
      const fetchedProducts = await fetchGlobalProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const openDialog = (product: Product | null = null) => {
    setEditMode(!!product);
    setSelectedProduct(product);
    setNewProduct(product || { name: '' });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
    setNewProduct({ name: '' });
  };

  const handleSaveProduct = async () => {
    if (editMode && selectedProduct) {
      const updatedProduct = await updateProduct(selectedProduct.id, newProduct);
      if (updatedProduct) {
        setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)));
      }
    } else {
      const addedProduct = await addProduct(newProduct);
      if (addedProduct) {
        setProducts((prev) => [...prev, addedProduct]);
      }
    }
    closeDialog();
  };

  const handleDeleteProduct = async (productId: string) => {
    const success = await deleteProduct(productId);
    if (success) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Product Name', width: 200, editable: false },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => openDialog(params.row)}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button variant="contained" size="small" color="secondary" onClick={() => handleDeleteProduct(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows: GridRowsProp = products.map((product) => ({
    id: product.id,
    name: product.name
  }));

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Global Product List
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => openDialog()}>
        Add New Product
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>

      {/* Dialog for Adding/Editing Product */}
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GlobalProductList;

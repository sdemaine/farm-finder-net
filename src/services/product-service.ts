import supabase from '../supabaseClient';
import { Product } from '../types/Products';

// Fetch all products
export const fetchGlobalProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
};

// Add a new product
export const addProduct = async (newProduct: Omit<Product, 'id'>): Promise<Product | null> => {
  const { data, error } = await supabase.from('products').insert(newProduct).select().single();

  if (error) {
    console.error('Error adding product:', error);
    return null;
  }
  return data as Product;
};

// Update an existing product
export const updateProduct = async (productId: string, updatedProduct: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', productId).select().single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  return data as Product;
};

// Delete a product
export const deleteProduct = async (productId: string): Promise<boolean> => {
  const { error } = await supabase.from('products').delete().eq('id', productId);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  return true;
};

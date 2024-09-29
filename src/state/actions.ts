import { updateState, store } from './store';
import { Farm } from '../types/Farm';
import { supabaseService } from '../services/supabase-service';

export const setSearchQuery = (searchQuery: string) => {
  updateState({ searchQuery });
  if (searchQuery.length >= 3) {
    filterFarms();
  } else {
    updateState({ filteredFarms: store.value.allFarms });
  }
};

export const filterFarms = () => {
  const { allFarms, searchQuery } = store.value;
  const filteredFarms = allFarms.filter((farm) =>
    farm.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase())) ||
    farm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  updateState({ filteredFarms });
};

export const fetchFarms = async () => {
  try {
    await supabaseService.fetchFarms();
  } catch (error) {
    console.error('Error fetching farms:', error);
    // You might want to update the state with an error message here
  }
};

export const addFarm = async (farm: Omit<Farm, 'id'>) => {
  try {
    await supabaseService.addFarm(farm);
  } catch (error) {
    console.error('Error adding farm:', error);
    // Handle the error (e.g., show a notification to the user)
  }
};

export const updateFarm = async (id: string, updates: Partial<Farm>) => {
  try {
    await supabaseService.updateFarm(id, updates);
  } catch (error) {
    console.error('Error updating farm:', error);
    // Handle the error
  }
};

export const deleteFarm = async (id: string) => {
  try {
    await supabaseService.deleteFarm(id);
  } catch (error) {
    console.error('Error deleting farm:', error);
    // Handle the error
  }
};

// New action to handle initial data loading
export const initializeApp = () => {
  fetchFarms();
};

// You might want to add more specific actions based on your app's needs
export const setPreferredFarm = async (id: string, isPreferred: boolean) => {
  try {
    await supabaseService.updateFarm(id, { preferred: isPreferred });
  } catch (error) {
    console.error('Error setting preferred farm:', error);
    // Handle the error
  }
};

export const addProductToFarm = async (farmId: string, product: string) => {
  try {
    const farm = store.value.allFarms.find(f => f.id === farmId);
    if (farm) {
      const updatedProducts = [...farm.products, product];
      await supabaseService.updateFarm(farmId, { products: updatedProducts });
    }
  } catch (error) {
    console.error('Error adding product to farm:', error);
    // Handle the error
  }
};

// Action to handle farm search with pagination
export const searchFarmsWithPagination = async (query: string, page: number, pageSize: number) => {
  try {
    const { farms, totalCount } = await supabaseService.searchFarms(query, page, pageSize);
    updateState({ 
      filteredFarms: farms,
      totalFarmsCount: totalCount,
      currentPage: page
    });
  } catch (error) {
    console.error('Error searching farms:', error);
    // Handle the error
  }
};
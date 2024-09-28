import { updateState, store } from './store';
import { Farm } from '../types/Farm';

export const setAllFarms = (farms: Farm[]) => {
  updateState({ allFarms: farms, filteredFarms: farms });
};

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
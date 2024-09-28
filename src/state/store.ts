import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Farm } from '../types/Farm';

interface AppState {
  allFarms: Farm[];
  filteredFarms: Farm[];
  searchQuery: string;
}

const initialState: AppState = {
  allFarms: [],
  filteredFarms: [],
  searchQuery: '',
};

export const store = new BehaviorSubject<AppState>(initialState);

export const updateState = (newState: Partial<AppState>) => {
  store.next({ ...store.value, ...newState });
};

export const selectAllFarms = () => store.pipe(map(state => state.allFarms));
export const selectFilteredFarms = () => store.pipe(map(state => state.filteredFarms));
export const selectSearchQuery = () => store.pipe(map(state => state.searchQuery));
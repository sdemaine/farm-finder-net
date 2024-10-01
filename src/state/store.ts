import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Farm } from '../types/Farm';
import { supabaseService } from 'src/services/supabase-service';
// import { supabaseService } from '@/services/supabase-service';

interface AppState {
  allFarms: Farm[];
  filteredFarms: Farm[];
  searchQuery: string;
  totalFarmsCount: number;
  currentPage: number;
}

const initialState: AppState = {
  allFarms: [],
  filteredFarms: [],
  searchQuery: '',
  totalFarmsCount: 0,
  currentPage: 1,
};

export const store = new BehaviorSubject<AppState>(initialState);

export const updateState = (newState: Partial<AppState>) => {
  store.next({ ...store.value, ...newState });
};

export const selectAllFarms = () => supabaseService.getFarmsObservable();
export const selectFilteredFarms = () => store.pipe(map(state => state.filteredFarms));
export const selectSearchQuery = () => store.pipe(map(state => state.searchQuery));

// Initialize farms
supabaseService.fetchFarms();

// Subscribe to farm changes
supabaseService.getFarmsObservable().subscribe((farms: any) => {
  updateState({ allFarms: farms, filteredFarms: farms });
});
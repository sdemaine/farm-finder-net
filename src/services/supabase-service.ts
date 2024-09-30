import { SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farm } from '../types/Farm';
import supabase from '../supabaseClient';

class SupabaseService {
    private supabase: SupabaseClient;
    private farmsSubject: BehaviorSubject<Farm[]>;
    private loadingSubject: BehaviorSubject<boolean>;
    private errorSubject: BehaviorSubject<string | null>;

    constructor() {
        this.supabase = supabase;
        this.farmsSubject = new BehaviorSubject<Farm[]>([]);
        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.errorSubject = new BehaviorSubject<string | null>(null);
    }

    async fetchFarms(): Promise<void> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        const { data, error } = await this.supabase.from('farms').select('*');

        if (error) {
            console.error('Error fetching farms:', error);
            this.errorSubject.next(error.message);
        } else {
            this.farmsSubject.next(data as Farm[]);
        }

        this.loadingSubject.next(false);
    }

    getFarmsObservable(): Observable<Farm[]> {
        return this.farmsSubject.asObservable();
    }

    async addFarm(farm: Omit<Farm, 'id'>): Promise<void> {
        const { data, error } = await this.supabase.from('farms').insert([farm]).select();

        if (error) {
            console.error('Error adding farm:', error);
            this.errorSubject.next(error.message);
            return;
        }

        const currentFarms = this.farmsSubject.getValue();
        this.farmsSubject.next([...currentFarms, data[0] as Farm]);
    }

    async updateFarm(id: string, updates: Partial<Farm>): Promise<void> {
        const { data, error } = await this.supabase.from('farms').update(updates).eq('id', id).select();

        if (error) {
            console.error('Error updating farm:', error);
            this.errorSubject.next(error.message);
            return;
        }

        const currentFarms = this.farmsSubject.getValue();
        const updatedFarms = currentFarms.map((farm) => (farm.id === id ? { ...farm, ...data[0] } : farm));
        this.farmsSubject.next(updatedFarms);
    }

    async deleteFarm(id: string): Promise<void> {
        const { error } = await this.supabase.from('farms').delete().eq('id', id);

        if (error) {
            console.error('Error deleting farm:', error);
            this.errorSubject.next(error.message);
            return;
        }

        const currentFarms = this.farmsSubject.getValue();
        const updatedFarms = currentFarms.filter((farm) => farm.id !== id);
        this.farmsSubject.next(updatedFarms);
    }

    async searchFarms(query: string, page: number, pageSize: number): Promise<{ farms: Farm[]; totalCount: number }> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        try {
            const start = (page - 1) * pageSize;
            const end = start + pageSize - 1;

            const { data, error, count } = await this.supabase
                .from('farms')
                .select('*', { count: 'exact' })
                .or(`name.ilike.%${query}%,products.cs.{${query}}`)
                .range(start, end);

            if (error) throw error;

            return { farms: data as Farm[], totalCount: count || 0 };
        } catch (error: any) {
            this.errorSubject.next(error.message);
            throw error;
        } finally {
            this.loadingSubject.next(false);
        }
    }
}

export const supabaseService = new SupabaseService();

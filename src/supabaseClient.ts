// src/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://oqazayxdhkmsafqoxahe.supabase.co';
const supabaseKey: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYXpheXhkaGttc2FmcW94YWhlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzM2MjkyMywiZXhwIjoyMDQyOTM4OTIzfQ.qC4yQPYvVWkDtafJqgcA57jOzR3WeaGvL07zhhDY44I';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Function to upload a photo to the 'farm_photos' storage bucket
export const uploadPhoto = async (file: File): Promise<any> => {
    try {
        const { data, error } = await supabase.storage.from('farm_photos').upload(`photos/${file.name}`, file);

        if (error) {
            throw error;
        }
        console.log('File uploaded successfully:', data);
        return data;
    } catch (error: any) {
        console.error('Error uploading file:', error.message);
        return null;
    }
};

// Function to get a public URL for a photo in the 'farm_photos' storage bucket
export const getPublicPhotoUrl = (fileName: string): string | null => {
    try {
        const { data } = supabase.storage.from('farm_photos').getPublicUrl(`photos/${fileName}`);

        if (!data) {
            throw new Error('Failed to get public URL');
        }
        console.log('Public URL:', data.publicUrl);
        return data.publicUrl;
    } catch (error: any) {
        console.error('Error getting public URL:', error.message);
        return null;
    }
};

// Function to list all photos in the 'farm_photos' storage bucket
export const listPhotos = async (): Promise<any[]> => {
    try {
        const { data, error } = await supabase.storage.from('farm_photos').list('photos', { limit: 100, offset: 0 });

        if (error) {
            throw error;
        }
        console.log('Files in bucket:', data);
        return data;
    } catch (error: any) {
        console.error('Error listing files:', error.message);
        return [];
    }
};

// Function to download a photo from the 'farm_photos' storage bucket
export const downloadPhoto = async (fileName: string): Promise<any> => {
    try {
        const { data, error } = await supabase.storage.from('farm_photos').download(`photos/${fileName}`);

        if (error) {
            throw error;
        }

        // Create a downloadable link in the browser
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        console.log('File downloaded successfully.');
        return data;
    } catch (error: any) {
        console.error('Error downloading file:', error.message);
        return null;
    }
};

// Function to delete a photo from the 'farm_photos' storage bucket
export const deletePhoto = async (fileName: string): Promise<any> => {
    try {
        const { data, error } = await supabase.storage.from('farm_photos').remove([`photos/${fileName}`]);

        if (error) {
            throw error;
        }
        console.log('File deleted successfully:', data);
        return data;
    } catch (error: any) {
        console.error('Error deleting file:', error.message);
        return null;
    }
};

export default supabase;

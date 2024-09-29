// src/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://oqazayxdhkmsafqoxahe.supabase.co';
const supabaseKey: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYXpheXhkaGttc2FmcW94YWhlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzM2MjkyMywiZXhwIjoyMDQyOTM4OTIzfQ.qC4yQPYvVWkDtafJqgcA57jOzR3WeaGvL07zhhDY44I';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


export default supabase;

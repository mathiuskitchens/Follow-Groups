import { useSupabase } from '../context/SupabaseContext';

const supabase = useSupabase();

if (!supabase) {
    throw new Error('Supabase client is not initialized');
}


export async function getAllPrayers() {
    const { data, error } = await supabase.from('Prayers').select('*');
return {data, error}
}
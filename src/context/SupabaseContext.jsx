import { createContext, useContext } from 'react';
import { supabase } from '../services/supabase';

// Validate environment variables
if (!import.meta.env.VITE_SUPA_PROJECT || !import.meta.env.VITE_SUPA_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize context with null instead of the client
const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
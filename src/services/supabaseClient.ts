import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://aobdhkqgoiavneaizbpq.supabase.co';
const DEFAULT_SUPABASE_KEY = atob('c2Jfc2VjcmV0X3VMdWpqYXRhTHExOWhaeVN2dmZocndfMzdESzBLenE=');

const getUrl = () => localStorage.getItem('prospectly_supabase_url') || import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const getKey = () => localStorage.getItem('prospectly_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

const supabaseUrl = getUrl();
const supabaseAnonKey = getKey();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  supabaseUrl.startsWith('http')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const setSupabaseCredentials = (url: string, key: string) => {
  localStorage.setItem('prospectly_supabase_url', url);
  localStorage.setItem('prospectly_supabase_anon_key', key);
  window.location.reload();
};

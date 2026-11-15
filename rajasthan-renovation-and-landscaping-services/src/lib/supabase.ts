import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://sujvtyooblitukmdedom.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1anZ0eW9vYmxpdHVrbWRlZG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NTAzNzEsImV4cCI6MjExMDMyNjM3MX0.2kB46niFbPtlG8_4U_RhUkmiEiD742kM5l81Mbq5R8E';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

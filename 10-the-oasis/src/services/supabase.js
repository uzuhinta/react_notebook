import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://npbddqgjxqndycfhnxny.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYmRkcWdqeHFuZHljZmhueG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4Mzg5NzQsImV4cCI6MjAxNzQxNDk3NH0.q3HuFJsb6KU9HLrcgDjm7crDdaB4Redo7gv8sDQNJxg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

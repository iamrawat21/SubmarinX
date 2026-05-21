import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glvenlpoownoufgbssfq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdmVubHBvb3dub3VmZ2Jzc2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzI4NjIsImV4cCI6MjA5NDk0ODg2Mn0.Hqoq-jlY8zThROaxZxUppwEBH90rVngWfhpwn8JqyMo';

export const supabase = createClient(supabaseUrl, supabaseKey);

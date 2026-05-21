import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://glvenlpoownoufgbssfq.supabase.co';
const supabaseKey = 'sb_secret_mdYk9qgR1WHxf99fv_Q_uw_9LV2GcGO';
const supabase = createClient(supabaseUrl, supabaseKey);
async function test() {
  const { data, error } = await supabase.from('contact_us').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
}
test();

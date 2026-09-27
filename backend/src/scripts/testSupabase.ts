import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

console.log('Connecting to Supabase at:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data: challenges, error } = await supabase.from('challenges').select('*');
    if (error) {
      console.log('Error querying challenges table:', error.message);
    } else {
      console.log('Successfully connected! Challenges count in Supabase:', challenges?.length);
    }
  } catch (err: any) {
    console.error('Connection exception:', err.message);
  }
}

testConnection();

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProjectLink() {
  console.log('🔄 Updating Google Drive link for Cinematic Showcase in Supabase...');
  
  const { data, error } = await supabase
    .from('portfolio_projects')
    .update({ link: 'https://drive.google.com/file/d/1_IgSdGUY0II3z8k82hjgPOfPhVaG4EGB/view' })
    .eq('case_study_slug', 'cinematic-showcase')
    .select();

  if (error) {
    console.error('❌ Error updating project link in Supabase:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ No projects updated. Please make sure database is seeded first.');
    return;
  }

  console.log('✅ Successfully updated project link in Supabase database!');
  console.log(data);
}

updateProjectLink();

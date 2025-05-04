import { createClient } from '@supabase/supabase-js';

// Use anon key for regular operations
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  return createClient(supabaseUrl, supabaseKey);
}

// Use the service role key to bypass RLS
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  return createClient(supabaseUrl, supabaseKey);
}

// Helper to ensure tables exist
export async function ensureDatabaseReady() {
  const adminSupabase = createAdminSupabaseClient();
  
  try {
    // Create/update users table
    await adminSupabase.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    // Create/update email_samples table
    await adminSupabase.sql`
      CREATE TABLE IF NOT EXISTS email_samples (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_email TEXT NOT NULL,
        content TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS email_samples_user_email_idx ON email_samples(user_email);
    `;
    
    // Disable RLS for development
    await adminSupabase.sql`
      ALTER TABLE users DISABLE ROW LEVEL SECURITY;
      ALTER TABLE email_samples DISABLE ROW LEVEL SECURITY;
    `;
    
    console.log('Database setup complete');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    // Continue anyway - tables might already exist
    return false;
  }
}

// Get email samples for a user
export async function getUserSamples(email: string) {
  if (!email) {
    console.error('No email provided for getUserSamples');
    return [];
  }
  
  // Use admin client to bypass RLS
  const supabase = createAdminSupabaseClient();
  console.log('Fetching samples for user:', email);
  
  try {
    const { data, error } = await supabase
      .from('email_samples')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching samples:', error);
      return [];
    }
    
    console.log(`Found ${data?.length || 0} samples for user:`, email);
    return data || [];
  } catch (error) {
    console.error('Unexpected error in getUserSamples:', error);
    return [];
  }
}

// Add a new email sample
export async function addSample(userEmail: string, content: string, description: string) {
  if (!userEmail) {
    return { 
      success: false, 
      error: 'No user email provided' 
    };
  }
  
  // Initialize database if needed
  await ensureDatabaseReady();
  
  // Use admin client to bypass RLS
  const supabase = createAdminSupabaseClient();
  console.log('Adding sample for user:', userEmail, { descLength: description?.length, contentLength: content?.length });
  
  try {
    // Normalize inputs
    const cleanDescription = description?.trim() || '';
    const cleanContent = content?.trim() || '';
    
    if (!cleanContent) {
      return { 
        success: false, 
        error: 'Email content is required' 
      };
    }
    
    // Insert the sample
    const { data, error } = await supabase
      .from('email_samples')
      .insert([
        { 
          user_email: userEmail, 
          content: cleanContent, 
          description: cleanDescription,
          created_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      console.error('Error inserting sample:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to add sample' 
      };
    }
    
    console.log('Sample added successfully');
    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error('Unexpected error in addSample:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

// Delete an email sample
export async function deleteSample(sampleId: string, userEmail: string) {
  if (!userEmail || !sampleId) {
    return { 
      success: false, 
      error: 'Sample ID and user email are required' 
    };
  }
  
  // Use admin client to bypass RLS
  const supabase = createAdminSupabaseClient();
  
  try {
    // First verify this sample belongs to the user
    const { data: sampleData, error: fetchError } = await supabase
      .from('email_samples')
      .select('id')
      .eq('id', sampleId)
      .eq('user_email', userEmail)
      .single();
    
    if (fetchError || !sampleData) {
      return { 
        success: false, 
        error: 'Sample not found or you do not have permission to delete it' 
      };
    }
    
    // Now delete the sample
    const { error: deleteError } = await supabase
      .from('email_samples')
      .delete()
      .eq('id', sampleId);
    
    if (deleteError) {
      return { 
        success: false, 
        error: deleteError.message || 'Failed to delete sample' 
      };
    }
    
    return { 
      success: true 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
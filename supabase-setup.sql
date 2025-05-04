-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (should already exist)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email samples table
CREATE TABLE IF NOT EXISTS email_samples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS email_samples_user_email_idx ON email_samples(user_email);

-- Enable Row Level Security for users and email_samples tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_samples ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Allow users to see their own record only
CREATE POLICY users_select_own ON users
  FOR SELECT USING (email = auth.jwt() ->> 'email');

-- Allow users to update their own record only
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (email = auth.jwt() ->> 'email');

-- Create policies for email_samples table
-- Allow users to select their own email samples
CREATE POLICY email_samples_select_own ON email_samples
  FOR SELECT USING (user_email = auth.jwt() ->> 'email');

-- Allow users to insert their own email samples
CREATE POLICY email_samples_insert_own ON email_samples
  FOR INSERT WITH CHECK (user_email = auth.jwt() ->> 'email');

-- Allow users to update their own email samples
CREATE POLICY email_samples_update_own ON email_samples
  FOR UPDATE USING (user_email = auth.jwt() ->> 'email');

-- Allow users to delete their own email samples
CREATE POLICY email_samples_delete_own ON email_samples
  FOR DELETE USING (user_email = auth.jwt() ->> 'email');
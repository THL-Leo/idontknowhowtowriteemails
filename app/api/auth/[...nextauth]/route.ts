import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Create users table if it doesn't exist
async function ensureUsersTable() {
  try {
    // Check if the table exists
    const { error: checkError } = await supabase
      .from('users')
      .select('email')
      .limit(1);
    
    if (checkError && checkError.code === 'PGRST204') {
      // Table doesn't exist, create it
      console.log('Creating users table...');
      const { error } = await supabase.sql`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;
      
      if (error) {
        console.error('Error creating users table:', error);
      }
    }
  } catch (error) {
    console.error('Error ensuring users table exists:', error);
  }
}

// Call this function when server starts
ensureUsersTable();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      
      try {
        // Store or update user in Supabase
        const { error } = await supabase
          .from('users')
          .upsert({
            email: user.email,
            name: user.name,
            image_url: user.image, // Changed from avatar_url to image_url
            updated_at: new Date().toISOString(),
          });
        
        if (error) {
          console.error('Error storing user in Supabase:', error);
          // Continue the sign-in process even if Supabase update fails
        }
        
        return true;
      } catch (error) {
        console.error('Unexpected error during sign-in:', error);
        // Continue anyway to allow authentication
        return true;
      }
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
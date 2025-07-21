import { createClient } from "@supabase/supabase-js"

// Fallback values for development/preview
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Check if we have real Supabase credentials
const hasSupabaseCredentials = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client
export const createServerClient = () => {
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
  return createClient(supabaseUrl, serverKey)
}

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => hasSupabaseCredentials

// Mock user for development when Supabase is not configured
export const mockUser = {
  id: "mock-user-id",
  email: "demo@napasbaru.com",
  user_metadata: {
    full_name: "Demo User",
  },
}

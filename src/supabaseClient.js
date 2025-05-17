import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://kqskeahmnfbdjaanlztk.supabase.co" //import.meta.env.local.VITE_SUPABASE_URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxc2tlYWhtbmZiZGphYW5senRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyOTc1ODQsImV4cCI6MjA2Mjg3MzU4NH0.LQCinZg880e5CrPZYD4mI68541kjkHyJJejr08FVmgU" //import.meta.env.local.VITE_SUPABASE_ANON_KEY



export const supabase = createClient(supabaseUrl, supabaseAnonKey)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// DÜZELTME: persistSession: false ayarını kaldırıyoruz.
// Supabase artık oturumları varsayılan olarak tarayıcıda saklayacaktır.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
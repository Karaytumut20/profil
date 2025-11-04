import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// KONTROL KODUNU KALDIRDIK VE GÜVENLİK AYARINI EKLEDİK
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Tarayıcı sekmesi kapatıldığında veya sayfa yenilendiğinde
    // oturumun kaybolmasını sağlar.
    persistSession: false
  }
})
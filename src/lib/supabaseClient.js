import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// GEÇİCİ KONTROL KODU: Konsolda çıktı verecek.
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("HATA: Supabase ortam değişkenleri yüklenmedi.");
  console.error("Lütfen .env.local dosyanızı kontrol edin.");
} else {
  console.log("Supabase URL:", supabaseUrl.substring(0, 30) + "...");
  console.log("Supabase Bağlantı Kontrolü: Başarılı.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
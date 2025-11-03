import { NextResponse } from 'next/server';
// Dikkat: Burada 'admin' client'ı değil, public client'ı (lib/supabaseClient) kullanıyoruz
// Çünkü RLS kuralını public INSERT için ayarladık.
import { supabase } from '../../../lib/supabaseClient'; // 'src/lib/' yolunuza göre ayarlayın

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Basit doğrulama
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 });
    }

    // Veriyi Supabase'e ekle
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { name, email, message }
      ]);

    if (error) {
      console.error('Supabase Hata:', error);
      return NextResponse.json({ error: 'Mesaj gönderilirken bir veritabanı hatası oluştu.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Mesajınız başarıyla alındı!' }, { status: 200 });

  } catch (err) {
    console.error('API Hata:', err);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
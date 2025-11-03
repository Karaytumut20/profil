// app/layout.js
import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'Gelişmiş Portfolyo Sitesi',
  description: 'Supabase ve Next.js ile güçlendirilmiştir',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
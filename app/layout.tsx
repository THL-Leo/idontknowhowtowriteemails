// app/layout.tsx
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/components/providers/session-provider';
import Header from '@/components/layout/header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Email Writing Assistant',
  description: 'Personalized email writing powered by Claude',
};

export default function RootLayout({ 
  children,
}: { 
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
          <footer style={{ 
            borderTop: '1px solid var(--border)',
            padding: '1rem 0',
            textAlign: 'center',
            color: 'var(--muted-foreground)',
            fontSize: '0.75rem',
            marginTop: '3rem'
          }}>
            <div className="container">
              <p>Email Writing Assistant &copy; {new Date().getFullYear()}</p>
            </div>
          </footer>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
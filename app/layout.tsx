import ThemeProvider from '@/context/theme-provider';
import { Inter } from 'next/font/google';
import './globals.css';
import NavbarUi from './navbar-ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Leader Board',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider>
          <NavbarUi />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

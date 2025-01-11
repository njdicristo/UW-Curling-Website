import './globals.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../app/theme';
import SessionProvider from '@/components/SessionProvider';
import { CssBaseline } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});
export default async function RootLayout({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={roboto.variable}>
      <SessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme} >
            <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

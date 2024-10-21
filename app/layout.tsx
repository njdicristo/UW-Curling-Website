import { NextAuthProvider } from '@/components/nextauth-proivder';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrapping the entire app with the SessionProvider */}
        <AppRouterCacheProvider>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

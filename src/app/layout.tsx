import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { DatabaseInitializer } from './components/DatabaseInitializer';
import Navbar from './components/Navbar';
import Loading from './loading';
import OrbWrapper from './components/OrbWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brickonomics - Construction Cost Estimator',
  description: 'Estimate and optimize construction costs in India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-blue-950 text-gray-100`}>
        <DatabaseInitializer />
        <Suspense fallback={null}>
          <OrbWrapper />
        </Suspense>
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
        </div>
      </body>
    </html>
  );
}

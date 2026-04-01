import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RAF // DASHBOARD',
  description: 'Biotechnologist & entrepreneur building at the intersection of AI, biotech, and decentralized science.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

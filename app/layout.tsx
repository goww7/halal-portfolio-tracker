import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Halal Portfolio Tracker',
  description:
    'Open-source Shariah-compliance tracker for your stock portfolio. Powered by Halal Terminal API.',
  openGraph: {
    title: 'Halal Portfolio Tracker',
    description: 'Track Shariah compliance across your stock portfolio.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}

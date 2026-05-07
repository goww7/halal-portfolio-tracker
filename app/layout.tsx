import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'Halal Portfolio — A Compliance Journal',
  description:
    'A quiet, editorial reading of your portfolio under five Shariah-screening methodologies. Powered by Halal Terminal.',
  openGraph: {
    title: 'Halal Portfolio — A Compliance Journal',
    description: 'Editorial Shariah-compliance tracker for your stocks.',
    type: 'website',
  },
};

// Inline script that runs before React hydrates, to set [data-theme] from
// localStorage. Without this, a user who picked Night sees a flash of Day.
const THEME_BOOT = `
(function() {
  try {
    var t = localStorage.getItem('hpt-theme');
    if (t === 'night') document.documentElement.dataset.theme = 'dark';
    else if (t === 'day') document.documentElement.dataset.theme = 'light';
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="font-sans">
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}

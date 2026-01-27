import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'ProScheduler Demo',
  description: 'Professional React calendar with drag-drop, timezone, i18n, and resources',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

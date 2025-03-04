import './globals.css';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'LinkedIn Network Insights',
  description: 'Get AI-powered insights for your LinkedIn network',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}

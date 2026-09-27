import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';

export const metadata: Metadata = {
  title: 'MahaInnovate - GovTech Challenge & Startup Procurement Platform',
  description: 'SIH Prototype for Government Challenge to Startup Procurement Sandbox & Scaling Lifecycle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

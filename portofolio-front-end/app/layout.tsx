import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Manrope, Space_Grotesk } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = {
  title: 'Alvin.dev | Portfolio',
  description: 'Portfolio of Muhammad Alvin Ababil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans selection:bg-[#7DD3FC]/40`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
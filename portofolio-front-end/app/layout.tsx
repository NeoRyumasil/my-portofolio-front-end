import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Manrope, Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  title: 'Muhammad Alvin Ababil | Portfolio',
  description: 'Portfolio of Muhammad Alvin Ababil',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={`
        ${manrope.variable} ${spaceGrotesk.variable} ${hanken.variable} ${jetbrains.variable} 
        min-h-screen font-sans 
        bg-[#F0F9FF] text-[#0F172A] selection:bg-[#7DD3FC]/40
        dark:bg-[#000000] dark:text-[#ffffff] dark:selection:bg-[#E11D48]/40
        transition-colors duration-300
      `}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <Header />
          {children}
          <Footer />
          
        </ThemeProvider>
      </body>
    </html>
  );
}
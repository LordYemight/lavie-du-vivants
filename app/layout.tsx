import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Lavie du Vivants | Premium Spices & Gourmet Catering',
  description: 'Artisanal spice blends, fresh mocktails, and gourmet catering based in Kaduna, Nigeria.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}
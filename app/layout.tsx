import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '700'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '500'] });

export const metadata: Metadata = {
  title: 'Lavie du Vivants | Elevating Every Meal',
  description: "It's All About The TASTE 🍷. Premium culinary solutions from Kaduna, Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
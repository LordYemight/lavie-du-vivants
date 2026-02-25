import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-heading" 
});
const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Lavie du Vivants | It's All About The TASTE 🍸",
  description: "Premium spice blends, granola, and event catering in Nigeria. Elevate your meals with the Lavie difference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans selection:bg-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
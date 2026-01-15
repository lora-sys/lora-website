import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', 
});


export const metadata: Metadata = {
  title: "My 3D Blog",
  description: "A blog about 3D art, modeling, and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={ `antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

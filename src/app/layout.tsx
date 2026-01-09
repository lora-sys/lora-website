import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { WebVitals } from "@/components/analytics/WebVitals";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { Navbar } from "@/components/ui/Navbar";
import { SkipLink } from "@/components/ui/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lora's Digital Studio | Creative Developer",
  description: "A digital space where creativity meets technology. Building beautiful experiences with code and design.",
  keywords: ["Lora", "Digital Studio", "Next.js", "TypeScript", "Creative Developer", "UI/UX"],
  authors: [{ name: "Lora" }],
  openGraph: {
    title: "Lora's Digital Studio",
    description: "A digital space where creativity meets technology",
    url: "https://lora.studio",
    siteName: "Lora's Digital Studio",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-512x512.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lora's Digital Studio",
    description: "A digital space where creativity meets technology",
  },
};

export const viewport = {
  width: "device-width" as const,
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ backgroundColor: '#050505', color: '#FFFFFF' }}
        suppressHydrationWarning={true}
      >
        <SkipLink />
        <AnimationProvider>
          <Navbar />
          {children}
          <Toaster />
          <WebVitals />
        </AnimationProvider>
      </body>
    </html>
  );
}

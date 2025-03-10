import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/next"
import "./globals.css";
import {TranslationProvider} from '@/app/context/TranslationContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Islamical",
  description: "Islam Is the website to check Ramadan Timings and Read the Holy Q'uran",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <TranslationProvider>
      {children}
      <Analytics/>
      <SpeedInsights/>
    </TranslationProvider>
    </body>
    </html>
  );
}

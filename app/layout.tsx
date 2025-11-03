import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientCursorLoader from "@/components/ClientCursorLoader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arya's Portfolio",
  description: "Modern and responsive portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  {/* hacker overlays & client cursor */}
  <div className="absolute inset-0 pointer-events-none z-0" aria-hidden />
  <ClientCursorLoader />
        {children}
      </body>
    </html>
  );
}

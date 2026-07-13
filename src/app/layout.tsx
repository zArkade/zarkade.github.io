import type { Metadata } from "next";
import Navbar from "./components/layout/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcos Gonçalves - Portfólio",
  description: "Portfólio profissional - Marcos Gonçalves, desenvolvedor back-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="antialiased">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6">{children}</main>
      </body>
    </html>
  );
}

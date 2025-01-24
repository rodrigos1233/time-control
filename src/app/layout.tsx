import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clockFont = localFont({
    src: './../app/fonts/digital-7.ttf',
    variable: '--font-clock',
});

export const metadata: Metadata = {
  title: "Time Focus - Criketic.com",
  description: "Web application allowing users to organise a duration into equal subdivisions, containing an analog and digital clocks to keep track of the passing time, with changing background colors as well as cricket and bell sounds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clockFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

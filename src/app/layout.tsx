import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';
import { NextIntlClientProvider } from "next-intl";
import { locales, defaultLocale } from "@/app/i18n"
import { getMessages } from "next-intl/server";


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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages({ locale: defaultLocale }); // No `params` needed

  return (
    <html lang={defaultLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clockFont.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

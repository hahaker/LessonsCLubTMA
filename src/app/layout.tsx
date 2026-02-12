import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AccessProvider } from "@/components/AccessProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Уроки | Закрытый клуб",
  description: "Мини-приложение для закрытого клуба с уроками",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <AccessProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 pb-16">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </AccessProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { ThemeProvider } from "@/components/providers/theme.provider";

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
  title: "SkillSwap — Peer Skill Exchange",
  description: "SkillSwap is a mentorship and skill exchange platform built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Theme & Global Providers */}
        <ThemeProvider defaultTheme="system" storageKey="skillswap-theme">
          {/* All pages + components */}
          {children}

          {/* Global Toast System */}
          <Toaster position="top-right" richColors />

          {/* Auto-trigger login/logout feedback */}
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Font vars exported so locale layout can apply them to <html>
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root layout is a pass-through; [locale]/layout.tsx renders <html lang={locale}>.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

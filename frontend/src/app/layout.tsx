import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuroraNavigation } from "@/components/AuroraNavigation";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Aurora - Predictive Wellness",
  description: "AI-powered health insights that adapt to your unique patterns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased bg-white text-neutral-900" suppressHydrationWarning>
        <div className="pb-24">
          {children}
        </div>
        <AuroraNavigation />
      </body>
    </html>
  );
}

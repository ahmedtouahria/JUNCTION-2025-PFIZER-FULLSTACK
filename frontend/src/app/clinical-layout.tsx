import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClinicalNavigation from "@/components/clinical/ClinicalNavigation";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: "Aurora - Migraine Risk Prediction",
  description: "Medical-grade migraine prediction and monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div style={{ paddingBottom: '80px' }}>
          {children}
        </div>
        <ClinicalNavigation />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import Providers from "@/context/providers";
import { Arimo } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";



const arimo = Arimo({
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchedIO",
  description: "Manage your work schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${arimo.className} antialiased`}
      >
        <AuthProvider>
          <Providers>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}

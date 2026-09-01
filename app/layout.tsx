import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Omar Store | متجر إلكتروني متكامل",
    template: "%s | Omar Store",
  },
  description: "تسوق أحدث الأجهزة الإلكترونية واللابتوبات بأفضل الأسعار مع توصيل سريع وضمان أصلي.",
  keywords: ["متجر إلكتروني", "إلكترونيات", "لابتوبات", "تسوق أونلاين", "Omar Store"],
  openGraph: {
    title: "Omar Store | متجر إلكتروني متكامل",
    description: "تسوق أحدث الأجهزة الإلكترونية بأفضل الأسعار",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
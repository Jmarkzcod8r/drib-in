import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

// This is your global layout which stays true to all page

export const metadata: Metadata = {
  title: "Next Amazona V2",
  description: "Modern Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <html lang="en">
      <body className={inter.className}>

      <Providers> {/* This is for your session */}
      <div className="min-h-screen flex flex-col">

      <Header />
      {/* where are the children */}
      {children}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>Copyright @ 2023 - All right reserved by Next Amazona V2</p>
      </footer>
      </div>
      </Providers>
      </body>
    </html>
  );
}

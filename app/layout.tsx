import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "SpaceAPI",
  description: "A space API for everything you might need from space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-900 text-white py-4">
          <div className="container">
            <h1 className="text-3xl font-bold">SpaceAPI</h1>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="bg-gray-900 text-white py-4 mt-8">
          <div className="container text-center">
            <p>&copy; {new Date().getFullYear()} SpaceAPI. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

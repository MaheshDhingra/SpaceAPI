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
        <header className="bg-gray-900 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">SpaceAPI</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-900 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>SpaceAPI - Built with Next.js and TypeScript</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

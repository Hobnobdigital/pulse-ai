import type { Metadata } from "next";
import { Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Pulse AI - Your Daily AI Intelligence",
  description: "Stay ahead with curated AI news, research breakthroughs, and industry insights.",
  openGraph: {
    title: "Pulse AI",
    description: "Your daily dose of AI intelligence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${newsreader.variable}`}>
      <body className="bg-white text-black font-body antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

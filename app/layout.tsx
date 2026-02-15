import type { Metadata } from "next";
import { Space_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse AI — Your Daily AI Intelligence Brief",
  description:
    "Stay ahead with curated AI news, research breakthroughs, and industry insights. Bite-sized intelligence for busy builders.",
  openGraph: {
    title: "Pulse AI — Your Daily AI Intelligence Brief",
    description:
      "Curated AI news, research breakthroughs, and industry insights.",
    type: "website",
    siteName: "Pulse AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse AI",
    description: "Your daily dose of AI intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${newsreader.variable}`}
    >
      <head>
        <script
          id="dsq-count-scr"
          src="//pulse-ai-blog.disqus.com/count.js"
          async
        />
      </head>
      <body className="bg-white text-ink antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Chatbot from "@/components/ui/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: "EventSync AI — Intelligent Safe Event Platform",
  description:
    "Discover, navigate, and connect at events with real-time AI insights. Smart safety features, crowd-aware navigation, and AI-powered networking.",
  keywords: [
    "event platform",
    "AI events",
    "smart navigation",
    "event safety",
    "networking",
    "hackathon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Chatbot />
      </body>
    </html>
  );
}

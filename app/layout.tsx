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
  metadataBase: new URL("https://daddypdf.com"),
  title: {
    default: "DaddyPDF - Reliable PDF Generation for Businesses",
    template: "%s | DaddyPDF",
  },
  description:
    "Create PDF templates once and generate them anytime with consistent layout and structure. Designed for organizations that rely on automated documents.",
  authors: [{ name: "DaddyPDF", url: "https://daddypdf.com" }],
  openGraph: {
    title: "DaddyPDF - Reliable PDF Generation for Businesses",
    description:
      "Create PDF templates once and generate them anytime with consistent layout and structure. Designed for organizations that rely on automated documents.",
    url: "https://daddypdf.com",
    siteName: "DaddyPDF",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DaddyPDF - Reliable PDF Generation for Businesses",
    description:
      "Create PDF templates once and generate them anytime with consistent layout and structure. Designed for organizations that rely on automated documents.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
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
        {children}
      </body>
    </html>
  );
}

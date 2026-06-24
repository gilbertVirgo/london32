import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "London 32",
  description: "Signposting, strengthening and serving London’s churches.",
  metadataBase: new URL("https://london32.org"),
  icons: {
    icon: [
      { url: "/seo/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/seo/safari-pinned-tab.svg",
        color: "#080708",
      },
    ],
  },
  openGraph: {
    title: "London 32",
    description: "Signposting, strengthening and serving London’s churches.",
    url: "/",
    siteName: "London 32",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "London 32 - Signposting, strengthening and serving London’s churches.",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London 32",
    description: "Signposting, strengthening and serving London’s churches.",
    images: ["/seo/x-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hes8dxr.css" />
      </head>
      <body className="min-h-full flex flex-col bg-[#080708] text-white font-sans">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

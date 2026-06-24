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

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "London 32",
	url: "https://london32.netlify.app",
	logo: "https://london32.netlify.app/logo.svg",
	description:
		"A Christian evangelical network dedicated to signposting, strengthening, and serving local churches across all 32 boroughs of London.",
	address: {
		"@type": "PostalAddress",
		addressLocality: "London",
		addressCountry: "GB",
	},
};

export const metadata: Metadata = {
	title: {
		default: "London 32 | Connecting & Serving London Churches",
		template: "%s | London 32",
	},
	description:
		"London 32 is a Christian evangelical network serving churches across all 32 London boroughs. Discover our church directory, resources, and connect with pastors.",
	metadataBase: new URL("https://london32.netlify.app"),
	alternates: {
		canonical: "/",
	},
	manifest: "/manifest.webmanifest",
	icons: {
		icon: [{ url: "/seo/favicon.svg", type: "image/svg+xml" }],
		apple: [
			{
				url: "/seo/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
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
		title: "London 32 | Connecting & Serving London Churches",
		description:
			"London 32 is a Christian evangelical network serving churches across all 32 London boroughs. Discover our church directory, resources, and connect with pastors.",
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
		title: "London 32 | Connecting & Serving London Churches",
		description:
			"London 32 is a Christian evangelical network serving churches across all 32 London boroughs. Discover our church directory, resources, and connect with pastors.",
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
				<link
					rel="stylesheet"
					href="https://use.typekit.net/hes8dxr.css"
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className="min-h-full flex flex-col bg-[#080708] text-white font-sans">
				{children}
				<PrismicPreview repositoryName={repositoryName} />
			</body>
		</html>
	);
}

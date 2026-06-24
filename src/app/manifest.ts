import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "London 32",
		short_name: "London 32",
		description: "Signposting, strengthening and serving London’s churches.",
		start_url: "/",
		display: "standalone",
		background_color: "#080708",
		theme_color: "#080708",
		icons: [
			{
				src: "/seo/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/seo/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}

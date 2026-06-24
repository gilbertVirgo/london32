import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/slice-simulator"],
		},
		sitemap: "https://london32.org/sitemap.xml",
	};
}

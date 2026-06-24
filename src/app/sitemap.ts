import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://london32.org";

	// Core static routes
	const routes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
	];

	// Dynamic CMS routes from Prismic
	try {
		const client = createClient();
		const pages = await client.getAllByType("page");

		pages.forEach((page) => {
			if (page.uid) {
				routes.push({
					url: `${baseUrl}/${page.uid}`,
					lastModified: new Date(page.last_publication_date),
					changeFrequency: "weekly" as const,
					priority: 0.8,
				});
			}
		});
	} catch (error) {
		console.error("Error generating dynamic sitemap routes:", error);
	}

	return routes;
}

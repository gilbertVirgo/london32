import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Metadata } from "next";

export async function generateMetadata({ params }: PageProps<"/[uid]">): Promise<Metadata> {
	const { uid } = await params;
	const client = createClient();
	try {
		const page = await client.getByUID("page", uid);
		return {
			title: page.data.meta_title || undefined,
			description: page.data.meta_description || undefined,
			alternates: {
				canonical: `/${uid}`,
			},
			openGraph: {
				title: page.data.meta_title || undefined,
				description: page.data.meta_description || undefined,
				images: page.data.meta_image?.url
					? [{ url: page.data.meta_image.url }]
					: undefined,
			},
			twitter: {
				card: "summary_large_image",
				title: page.data.meta_title || undefined,
				description: page.data.meta_description || undefined,
				images: page.data.meta_image?.url ? [page.data.meta_image.url] : undefined,
			},
		};
	} catch {
		return {
			title: "Page Not Found",
		};
	}
}

export default async function Page({ params }: PageProps<"/[uid]">) {
	const { uid } = await params;
	const client = createClient();
	const page = await client.getByUID("page", uid);

	return <SliceZone slices={page.data.slices} components={components} />;
}
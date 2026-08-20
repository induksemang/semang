import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://semang.id";

const routes = ["", "/fitur", "/cara-kerja", "/harga", "/keamanan", "/privasi"];

export default function sitemap(): MetadataRoute.Sitemap {
	return routes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: route === "" ? 1 : 0.8
	}));
}

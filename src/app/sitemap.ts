import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { locales } from "@/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://martzcode.vercel.app";

const STATIC_PATHS = [
  "",
  "/about",
  "/projects",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      staticEntries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
          ),
        },
      });
    }
  }

  const postEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllProjects(locale).map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: new Date(project.date),
    })),
  );

  return [...staticEntries, ...postEntries, ...projectEntries];
}

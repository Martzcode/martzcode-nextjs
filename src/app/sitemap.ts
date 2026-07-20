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

function languagesFor(path: string): Record<string, string> {
  return Object.fromEntries(
    locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      alternates: { languages: languagesFor(path) },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => {
      const path = `/blog/${post.slug}`;
      return {
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(post.date),
        alternates: { languages: languagesFor(path) },
      };
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllProjects(locale).map((project) => {
      const path = `/projects/${project.slug}`;
      return {
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(project.date),
        alternates: { languages: languagesFor(path) },
      };
    }),
  );

  return [...staticEntries, ...postEntries, ...projectEntries];
}

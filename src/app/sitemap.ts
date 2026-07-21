import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects, getAllTags, getPaginatedPosts } from "@/lib/content";
import { locales } from "@/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://martzcode.vercel.app";

function alternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    const localePrefix = `/${locale}`;

    const staticPages = [
      { path: "", priority: 1.0 as const, changefreq: "weekly" as const },
      { path: "/about", priority: 0.8 as const, changefreq: "monthly" as const },
      { path: "/projects", priority: 0.9 as const, changefreq: "weekly" as const },
      { path: "/blog", priority: 0.9 as const, changefreq: "daily" as const },
      { path: "/contact", priority: 0.7 as const, changefreq: "monthly" as const },
      { path: "/privacy", priority: 0.3 as const, changefreq: "yearly" as const },
      { path: "/terms", priority: 0.3 as const, changefreq: "yearly" as const },
    ];

    for (const { path, priority, changefreq } of staticPages) {
      entries.push({
        url: `${BASE_URL}${localePrefix}${path}`,
        lastModified: now,
        changeFrequency: changefreq,
        priority,
        alternates: alternates(path),
      });
    }

    const posts = getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}${localePrefix}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    const { totalPages } = getPaginatedPosts(1, locale);
    for (let page = 2; page <= totalPages; page++) {
      entries.push({
        url: `${BASE_URL}${localePrefix}/blog/page/${page}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.5,
      });
    }

    const tags = getAllTags(locale);
    for (const tag of tags) {
      entries.push({
        url: `${BASE_URL}${localePrefix}/blog/tags/${tag}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }

    const projects = getAllProjects(locale);
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}${localePrefix}/projects/${project.slug}`,
        lastModified: new Date(project.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}

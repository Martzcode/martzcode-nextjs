/**
 * Route Handler remplaçant app/sitemap.ts.
 *
 * Avantage par rapport à sitemap.ts : on contrôle le XML brut, ce qui permet
 * d'injecter la processing instruction <?xml-stylesheet?> pour un affichage
 * stylisé dans les navigateurs.
 *
 * Accessible via GET /sitemap.xml
 */

import { getAllPosts, getAllProjects, getAllTags, getPaginatedPosts } from "@/lib/content";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

// Force le rendu dynamique pour que le sitemap reflète toujours le contenu actuel.
export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://martzcode.vercel.app";

// ── Helpers hreflang ──────────────────────────────────────────────────────────

function xhtmlLinks(langs: Record<string, string>): string {
  return Object.entries(langs)
    .map(
      ([lang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`,
    )
    .join("\n");
}

function allLocaleAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
    "x-default": `${BASE_URL}/${defaultLocale}${path}`,
  };
}

function crossLocaleAlternates(
  locale: Locale,
  path: string,
  others: Locale[],
  hasSlug: (l: Locale) => boolean,
): Record<string, string> {
  const langs: Record<string, string> = { [locale]: `${BASE_URL}/${locale}${path}` };
  for (const l of others) {
    if (hasSlug(l)) {
      langs[l] = `${BASE_URL}/${l}${path}`;
    }
  }
  langs["x-default"] = langs[defaultLocale] ?? `${BASE_URL}/${locale}${path}`;
  return langs;
}

// ── Génération des entrées <url> ──────────────────────────────────────────────

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  alternates?: Record<string, string>;
}

function urlBlock(entry: UrlEntry): string {
  const altBlock = entry.alternates
    ? `\n${xhtmlLinks(entry.alternates)}`
    : "";
  return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${altBlock}
  </url>`;
}

function toIso(date: Date): string {
  return date.toISOString().split("T")[0];
}

// ── Route Handler ─────────────────────────────────────────────────────────────

export async function GET(): Promise<Response> {
  const now = new Date();
  const entries: UrlEntry[] = [];

  // Pages statiques
  const staticPages = [
    { path: "",          priority: 1.0, changefreq: "weekly"  },
    { path: "/about",    priority: 0.8, changefreq: "monthly" },
    { path: "/projects", priority: 0.9, changefreq: "weekly"  },
    { path: "/blog",     priority: 0.9, changefreq: "daily"   },
    { path: "/contact",  priority: 0.7, changefreq: "monthly" },
    { path: "/privacy",  priority: 0.3, changefreq: "yearly"  },
    { path: "/terms",    priority: 0.3, changefreq: "yearly"  },
  ];

  for (const locale of locales) {
    for (const { path, priority, changefreq } of staticPages) {
      entries.push({
        loc: `${BASE_URL}/${locale}${path}`,
        lastmod: toIso(now),
        changefreq,
        priority,
        alternates: allLocaleAlternates(path),
      });
    }
  }

  // Articles de blog
  const postSlugsByLocale = Object.fromEntries(
    locales.map((l) => [l, new Set(getAllPosts(l).map((p) => p.slug))]),
  ) as Record<Locale, Set<string>>;

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    const others = locales.filter((l) => l !== locale);
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        loc: `${BASE_URL}/${locale}${path}`,
        lastmod: post.date,
        changefreq: "monthly",
        priority: 0.7,
        alternates: crossLocaleAlternates(locale, path, others, (l) =>
          postSlugsByLocale[l].has(post.slug),
        ),
      });
    }
  }

  // Pagination du blog (page 2+)
  for (const locale of locales) {
    const { totalPages } = getPaginatedPosts(1, locale);
    for (let page = 2; page <= totalPages; page++) {
      const path = `/blog/page/${page}`;
      entries.push({
        loc: `${BASE_URL}/${locale}${path}`,
        lastmod: toIso(now),
        changefreq: "daily",
        priority: 0.5,
        alternates: allLocaleAlternates(path),
      });
    }
  }

  // Tags
  for (const locale of locales) {
    const tags = getAllTags(locale);
    for (const tag of tags) {
      const path = `/blog/tags/${tag}`;
      entries.push({
        loc: `${BASE_URL}/${locale}${path}`,
        lastmod: toIso(now),
        changefreq: "weekly",
        priority: 0.4,
        alternates: allLocaleAlternates(path),
      });
    }
  }

  // Projets
  const projectSlugsByLocale = Object.fromEntries(
    locales.map((l) => [l, new Set(getAllProjects(l).map((p) => p.slug))]),
  ) as Record<Locale, Set<string>>;

  for (const locale of locales) {
    const projects = getAllProjects(locale);
    const others = locales.filter((l) => l !== locale);
    for (const project of projects) {
      const path = `/projects/${project.slug}`;
      entries.push({
        loc: `${BASE_URL}/${locale}${path}`,
        lastmod: project.date,
        changefreq: "monthly",
        priority: 0.8,
        alternates: crossLocaleAlternates(locale, path, others, (l) =>
          projectSlugsByLocale[l].has(project.slug),
        ),
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${entries.map(urlBlock).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

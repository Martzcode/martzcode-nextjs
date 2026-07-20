import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { Post, PostPreview, TocItem } from "@/types/post";
import { Project, ProjectPreview, ProjectStatus } from "@/types/project";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

type ContentType = "blog" | "projets";

function resolveLocale(locale?: string): Locale {
  return locale && isLocale(locale) ? locale : defaultLocale;
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

// ---------- Schémas de validation du frontmatter (zod) ----------

const baseSchema = z.object({
  title: z.string().min(1, "title est requis"),
  description: z.string().min(1, "description est requise"),
  date: z.iso.date("date doit être au format ISO (AAAA-MM-JJ)"),
  coverImage: z.string().min(1, "coverImage est requise"),
  thumbnail: z.string().min(1, "thumbnail est requis"),
  published: z.boolean().default(false),
});

const postSchema = baseSchema.extend({
  tags: z.array(z.string()).default([]),
});

const projectSchema = baseSchema.extend({
  stack: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(["en-cours", "termine", "archive"]).default("en-cours"),
  repoUrl: z.url("repoUrl doit être une URL valide").optional(),
  demoUrl: z.url("demoUrl doit être une URL valide").optional(),
  featured: z.boolean().default(false),
});

const schemas = {
  blog: postSchema,
  projets: projectSchema,
} satisfies Record<ContentType, z.ZodTypeAny>;

type PostFrontmatter = z.infer<typeof postSchema>;
type ProjectFrontmatter = z.infer<typeof projectSchema>;

// ---------- Lecture bas niveau (générique) ----------

/**
 * Extrait la table des matières à partir des titres ## et ### du markdown brut.
 * Le "slug" de chaque titre doit correspondre à celui généré par rehype-slug
 * au rendu (kebab-case, sans accents/ponctuation).
 */
function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // retire les accents
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}

function getSlugs(type: ContentType, locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, type, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

type Parsed<T extends ContentType> = T extends "blog"
  ? PostFrontmatter
  : ProjectFrontmatter;

function readOne<T extends ContentType>(
  type: T,
  locale: Locale,
  slug: string,
): {
  data: Parsed<T>;
  content: string;
  toc: TocItem[];
  readingTimeText: string;
} {
  const filePath = path.join(CONTENT_DIR, type, locale, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const parsed = schemas[type].safeParse(data);
  if (!parsed.success) {
    const message = z.prettifyError(parsed.error);
    throw new Error(
      `Frontmatter invalide pour ${type}/${slug}.mdx :\n${message}`,
    );
  }

  return {
    data: parsed.data as Parsed<T>,
    content,
    toc: extractToc(content),
    readingTimeText: readingTime(content).text,
  };
}

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Vrai si la date est strictement postérieure à aujourd'hui (article programmé, pas encore publiable). */
export function isUpcoming(dateStr: string): boolean {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d.getTime() > today.getTime();
}

/** Filtre public : publié ET pas à venir. `includeUnpublished` (preview) tout garde. */
function isVisible(item: { published: boolean; date: string }, includeUnpublished: boolean): boolean {
  if (includeUnpublished) return true;
  return item.published && !isUpcoming(item.date);
}

// ---------- BLOG ----------

export function getAllPosts(
  locale?: string,
  includeUnpublished = false,
): PostPreview[] {
  const loc = resolveLocale(locale);
  const posts = getSlugs("blog", loc).map((slug) => {
    const { data, readingTimeText } = readOne("blog", loc, slug);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags,
      coverImage: data.coverImage,
      thumbnail: data.thumbnail,
      published: data.published,
      readingTime: readingTimeText,
    } satisfies PostPreview;
  });

  return sortByDateDesc(
    posts.filter((p) => isVisible(p, includeUnpublished)),
  );
}

export function getPostBySlug(slug: string, locale?: string): Post | null {
  const loc = resolveLocale(locale);
  if (!getSlugs("blog", loc).includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("blog", loc, slug);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags,
    coverImage: data.coverImage,
    thumbnail: data.thumbnail,
    published: data.published,
    readingTime: readingTimeText,
    toc,
    content,
  };
}

export function getPostsByTag(tag: string, locale?: string): PostPreview[] {
  return getAllPosts(locale).filter((p) => p.tags.includes(tag));
}

export const POSTS_PER_PAGE = 6;

export function getPaginatedPosts(
  page = 1,
  locale?: string,
  perPage = POSTS_PER_PAGE,
): { posts: PostPreview[]; page: number; totalPages: number; total: number } {
  const all = getAllPosts(locale);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, page: current, totalPages, total };
}

export function getAllTags(locale?: string): string[] {
  const tags = getAllPosts(locale).flatMap((p) => p.tags);
  return Array.from(new Set(tags)).sort();
}

/** Articles connexes : partage au moins un tag, exclut l'article courant, limité à `limit` */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  locale?: string,
  limit = 3,
): PostPreview[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

// ---------- PROJETS (structure miroir) ----------

export function getAllProjects(
  locale?: string,
  includeUnpublished = false,
): ProjectPreview[] {
  const loc = resolveLocale(locale);
  const projects = getSlugs("projets", loc).map((slug) => {
    const { data, readingTimeText } = readOne("projets", loc, slug);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      stack: data.stack,
      tags: data.tags,
      status: data.status,
      repoUrl: data.repoUrl,
      demoUrl: data.demoUrl,
      coverImage: data.coverImage,
      thumbnail: data.thumbnail,
      published: data.published,
      featured: data.featured,
      readingTime: readingTimeText,
    } satisfies ProjectPreview;
  });

  return sortByDateDesc(
    projects.filter((p) => isVisible(p, includeUnpublished)),
  );
}

export function getProjectBySlug(slug: string, locale?: string): Project | null {
  const loc = resolveLocale(locale);
  if (!getSlugs("projets", loc).includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("projets", loc, slug);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    stack: data.stack,
    tags: data.tags,
    status: data.status,
    repoUrl: data.repoUrl,
    demoUrl: data.demoUrl,
    coverImage: data.coverImage,
    thumbnail: data.thumbnail,
    published: data.published,
    featured: data.featured,
    readingTime: readingTimeText,
    toc,
    content,
  };
}

export type { ContentType, ProjectStatus };

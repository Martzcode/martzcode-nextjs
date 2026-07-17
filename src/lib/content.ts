import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { Post, PostPreview, TocItem } from "@/types/post";
import { Project, ProjectPreview, ProjectStatus } from "@/types/project";

type ContentType = "blog" | "projets";

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

function getSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_DIR, type);
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
  slug: string,
): {
  data: Parsed<T>;
  content: string;
  toc: TocItem[];
  readingTimeText: string;
} {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
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

export function getAllPosts(includeUnpublished = false): PostPreview[] {
  const posts = getSlugs("blog").map((slug) => {
    const { data, readingTimeText } = readOne("blog", slug);
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

export function getPostBySlug(slug: string): Post | null {
  if (!getSlugs("blog").includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("blog", slug);

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

export function getPostsByTag(tag: string): PostPreview[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export const POSTS_PER_PAGE = 6;

export function getPaginatedPosts(
  page = 1,
  perPage = POSTS_PER_PAGE,
): { posts: PostPreview[]; page: number; totalPages: number; total: number } {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, page: current, totalPages, total };
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags);
  return Array.from(new Set(tags)).sort();
}

/** Articles connexes : partage au moins un tag, exclut l'article courant, limité à `limit` */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3,
): PostPreview[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

// ---------- PROJETS (structure miroir) ----------

export function getAllProjects(includeUnpublished = false): ProjectPreview[] {
  const projects = getSlugs("projets").map((slug) => {
    const { data, readingTimeText } = readOne("projets", slug);
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

export function getProjectBySlug(slug: string): Project | null {
  if (!getSlugs("projets").includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("projets", slug);

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

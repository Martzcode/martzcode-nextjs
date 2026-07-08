import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostPreview, TocItem } from "@/types/post";
import { Project, ProjectPreview } from "@/types/project";

type ContentType = "blog" | "projets";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

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

function readOne(type: ContentType, slug: string) {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const toc = extractToc(content);
  const time = readingTime(content);

  return { data, content, toc, readingTimeText: time.text };
}

// ---------- BLOG ----------

export function getAllPosts(includeUnpublished = false): PostPreview[] {
  const slugs = getSlugs("blog");

  const posts = slugs.map((slug) => {
    const { data, readingTimeText } = readOne("blog", slug);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags ?? [],
      coverImage: data.coverImage,
      thumbnail: data.thumbnail,
      published: data.published ?? false,
      readingTime: readingTimeText,
    } as PostPreview;
  });

  return posts
    .filter((p) => includeUnpublished || p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const slugs = getSlugs("blog");
  if (!slugs.includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("blog", slug);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    thumbnail: data.thumbnail,
    published: data.published ?? false,
    readingTime: readingTimeText,
    toc,
    content,
  };
}

export function getPostsByTag(tag: string): PostPreview[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags);
  return Array.from(new Set(tags)).sort();
}

/** Articles connexes : partage au moins un tag, exclut l'article courant, limité à `limit` */
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): PostPreview[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

// ---------- PROJETS (structure miroir) ----------

export function getAllProjects(includeUnpublished = false): ProjectPreview[] {
  const slugs = getSlugs("projets");

  const projects = slugs.map((slug) => {
    const { data, readingTimeText } = readOne("projets", slug);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      stack: data.stack ?? [],
      tags: data.tags ?? [],
      status: data.status ?? "en-cours",
      repoUrl: data.repoUrl,
      demoUrl: data.demoUrl,
      coverImage: data.coverImage,
      thumbnail: data.thumbnail,
      published: data.published ?? false,
      featured: data.featured ?? false,
      readingTime: readingTimeText,
    } as ProjectPreview;
  });

  return projects
    .filter((p) => includeUnpublished || p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | null {
  const slugs = getSlugs("projets");
  if (!slugs.includes(slug)) return null;

  const { data, content, toc, readingTimeText } = readOne("projets", slug);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    stack: data.stack ?? [],
    tags: data.tags ?? [],
    status: data.status ?? "en-cours",
    repoUrl: data.repoUrl,
    demoUrl: data.demoUrl,
    coverImage: data.coverImage,
    thumbnail: data.thumbnail,
    published: data.published ?? false,
    featured: data.featured ?? false,
    readingTime: readingTimeText,
    toc,
    content,
  };
}

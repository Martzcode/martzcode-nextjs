import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTags, getPostsByTag } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

type Params = { tag: string };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Articles tagués #${decoded}`,
    description: `Tous les articles liés au tag ${decoded}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Retour au blog
      </Link>

      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tag : #{decoded}
        </h1>
        <p className="text-sm text-muted-foreground">
          {posts.length} article{posts.length > 1 ? "s" : ""}
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border pb-6">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {post.description}
              </p>
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Link key={t} href={`/blog/tags/${encodeURIComponent(t)}`}>
                  <Badge variant="secondary">#{t}</Badge>
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

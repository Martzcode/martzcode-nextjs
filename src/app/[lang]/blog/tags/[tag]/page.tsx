import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllTags, getPostsByTag } from "@/lib/content";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type Params = { lang: string; tag: string };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, tag } = await params;
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
  const { lang, tag } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded, locale);

  if (posts.length === 0) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <Link
        href={`/${locale}/blog`}
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← {dict.blog.backToBlog}
      </Link>

      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {dict.blog.tagPrefix} #{decoded}
        </h1>
        <p className="text-sm text-muted-foreground">
          {posts.length} {posts.length > 1 ? dict.blog.tagCountOther : dict.blog.tagCountOne}
        </p>
      </header>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border pb-6">
            <Link href={`/${locale}/blog/${post.slug}`} className="group">
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
                <Link
                  key={t}
                  href={`/${locale}/blog/tags/${encodeURIComponent(t)}`}
                >
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content";
import { mdxComponents } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Retour au blog
      </Link>

      <article className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        {post.toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-semibold text-foreground">Sommaire</p>
              <nav className="mt-3 space-y-2 text-sm">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={
                      item.level === 3
                        ? "block pl-4 text-muted-foreground hover:text-primary"
                        : "block text-muted-foreground hover:text-primary"
                    }
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <div>
          <header className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>
            <p className="text-muted-foreground">{post.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
                  <Badge variant="secondary">#{tag}</Badge>
                </Link>
              ))}
            </div>
            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="mt-4 w-full rounded-lg border border-border object-cover"
              />
            )}
          </header>

          <div className="mt-8">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground">
                Articles connexes
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-primary hover:underline"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}

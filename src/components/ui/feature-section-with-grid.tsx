import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface FeaturePost {
  title: string;
  description: string;
  date: string;
  meta: string;
  href: string;
  image: string;
}

export interface FeaturePagination {
  page: number;
  totalPages: number;
}

function pageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

function Feature({
  posts,
  pagination,
}: {
  posts: FeaturePost[];
  pagination?: FeaturePagination;
}) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Blog</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left">
                Latest posts
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Notes, tutorials and ideas on building for the web.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="flex h-full flex-col gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md aspect-video w-full object-cover"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.meta}</span>
                </div>
                <h3 className="text-xl tracking-tight">{post.title}</h3>
                <p className="text-muted-foreground text-base">
                  {post.description}
                </p>
                <Button asChild variant="link" className="mt-auto self-start p-0">
                  <Link href={post.href}>Read more</Link>
                </Button>
              </article>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {pagination.page > 1 && (
                <Button asChild variant="outline" size="sm">
                  <Link href={pageHref(pagination.page - 1)}>← Précédent</Link>
                </Button>
              )}
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <Button
                    key={p}
                    asChild
                    variant={p === pagination.page ? "default" : "ghost"}
                    size="sm"
                  >
                    <Link href={pageHref(p)}>{p}</Link>
                  </Button>
                ),
              )}
              {pagination.page < pagination.totalPages && (
                <Button asChild variant="outline" size="sm">
                  <Link href={pageHref(pagination.page + 1)}>Suivant →</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Feature };

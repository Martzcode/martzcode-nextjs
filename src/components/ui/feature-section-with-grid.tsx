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

function pageHref(page: number, locale: string): string {
  return page <= 1 ? `/${locale}/blog` : `/${locale}/blog/page/${page}`;
}

function Feature({
  posts,
  pagination,
  locale,
  eyebrow,
  title,
  description,
  readMore,
  previous,
  next,
}: {
  posts: FeaturePost[];
  pagination?: FeaturePagination;
  locale: string;
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  previous: string;
  next: string;
}) {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>{eyebrow}</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left">
                {title}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                {description}
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
                  <Link href={post.href}>{readMore}</Link>
                </Button>
              </article>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {pagination.page > 1 && (
                <Button asChild variant="outline" size="sm">
                   <Link href={pageHref(pagination.page - 1, locale)}>{previous}</Link>
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
                     <Link href={pageHref(p, locale)}>{p}</Link>
                  </Button>
                ),
              )}
              {pagination.page < pagination.totalPages && (
                <Button asChild variant="outline" size="sm">
                   <Link href={pageHref(pagination.page + 1, locale)}>{next}</Link>
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

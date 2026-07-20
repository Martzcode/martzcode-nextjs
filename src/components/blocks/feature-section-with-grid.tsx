import { Feature, type FeaturePost } from "@/components/ui/feature-section-with-grid";
import { getPaginatedPosts } from "@/lib/content";
import type { Dictionary } from "@/i18n/dictionaries";

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FeatureDemo({
  locale,
  page = 1,
  dict,
}: {
  locale: string;
  page?: number;
  dict: Dictionary["blog"];
}) {
  const { posts, totalPages, page: current } = getPaginatedPosts(page, locale);

  const items: FeaturePost[] = posts.map((p) => ({
    title: p.title,
    description: p.description,
    date: formatDate(p.date, locale),
    meta: p.readingTime,
    href: `/${locale}/blog/${p.slug}`,
    image: p.coverImage,
  }));

  return (
    <div className="w-full">
      <Feature
        posts={items}
        pagination={{ page: current, totalPages }}
        locale={locale}
        eyebrow={dict.eyebrow}
        title={dict.title}
        description={dict.description}
        readMore={dict.readMore}
        previous={dict.previous}
        next={dict.next}
      />
    </div>
  );
}

export { FeatureDemo };

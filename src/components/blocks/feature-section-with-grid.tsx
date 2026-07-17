import { Feature, type FeaturePost } from "@/components/ui/feature-section-with-grid";
import { getPaginatedPosts } from "@/lib/content";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FeatureDemo({ page = 1 }: { page?: number }) {
  const { posts, totalPages, page: current } = getPaginatedPosts(page);

  const items: FeaturePost[] = posts.map((p) => ({
    title: p.title,
    description: p.description,
    date: formatDate(p.date),
    meta: p.readingTime,
    href: `/blog/${p.slug}`,
    image: p.coverImage,
  }));

  return (
    <div className="w-full">
      <Feature
        posts={items}
        pagination={{ page: current, totalPages }}
      />
    </div>
  );
}

export { FeatureDemo };

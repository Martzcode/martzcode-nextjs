import { Gallery4 } from "@/components/ui/gallery4";
import { getAllProjects } from "@/lib/content";

function Gallery4Demo({
  locale,
  title,
  description,
}: {
  locale: string;
  title: string;
  description: string;
}) {
  const items = getAllProjects(locale).map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    href: `/${locale}/projects/${p.slug}`,
    image: p.coverImage,
  }));

  return (
    <Gallery4 title={title} description={description} items={items} />
  );
}

export { Gallery4Demo };

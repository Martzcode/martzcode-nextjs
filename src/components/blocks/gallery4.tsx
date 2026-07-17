import { Gallery4 } from "@/components/ui/gallery4";
import { getAllProjects } from "@/lib/content";

function Gallery4Demo() {
  const items = getAllProjects().map((p) => ({
    id: p.slug,
    title: p.title,
    description: p.description,
    href: `/projects/${p.slug}`,
    image: p.coverImage,
  }));

  return (
    <Gallery4
      title="Projects"
      description="Discover selected personal and professional projects built with modern web technologies. Each card links to a detailed case study."
      items={items}
    />
  );
}

export { Gallery4Demo };

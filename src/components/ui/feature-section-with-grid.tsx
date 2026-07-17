import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "Building a Modern Component Library",
    description:
      "How a composable, copy-paste approach makes UI development faster and more maintainable.",
    date: "Jul 2, 2025",
    author: "Martz",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "The Utility-First Revolution",
    description:
      "Why utility-first CSS changed the way we style interfaces and ship consistent designs.",
    date: "Jun 18, 2025",
    author: "Martz",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Astro's Islands Architecture",
    description:
      "Sending zero JS by default and hydrating only what's interactive keeps sites fast.",
    date: "May 30, 2025",
    author: "Jane Doe",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "React Server Components in Practice",
    description:
      "Rendering on the server unlocks simpler data fetching and smaller client bundles.",
    date: "May 12, 2025",
    author: "John Smith",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Shipping Fast with Next.js",
    description:
      "File-based routing, server components and automatic optimization out of the box.",
    date: "Apr 28, 2025",
    author: "Martz",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    title: "Designing for Accessibility",
    description:
      "Small, deliberate choices make products usable for everyone, not just some.",
    date: "Apr 10, 2025",
    author: "Alice",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

function Feature() {
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
                  <span>{post.author}</span>
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
        </div>
      </div>
    </div>
  );
}

export { Feature };

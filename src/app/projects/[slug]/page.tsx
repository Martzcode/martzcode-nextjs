import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { getAllProjects, getProjectBySlug, type ProjectStatus } from "@/lib/content";
import { mdxComponents } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

const statusLabels: Record<ProjectStatus, string> = {
  "en-cours": "En cours",
  termine: "Terminé",
  archive: "Archivé",
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Retour aux projets
      </Link>

      <article className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        {project.toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-sm font-semibold text-foreground">Sommaire</p>
              <nav className="mt-3 space-y-2 text-sm">
                {project.toc.map((item) => (
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{statusLabels[project.status]}</Badge>
              {project.featured && <Badge>En vedette</Badge>}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="text-muted-foreground">{project.description}</p>

            {project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {project.repoUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    Code source
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild size="sm">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Démo
                  </a>
                </Button>
              )}
            </div>

            {project.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                className="mt-4 w-full rounded-lg border border-border object-cover"
              />
            )}
          </header>

          <div className="mt-8">
            <MDXRemote
              source={project.content}
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
        </div>
      </article>
    </main>
  );
}

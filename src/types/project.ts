import { TocItem } from "./post";

export type ProjectStatus = "en-cours" | "termine" | "archive";

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  stack: string[]; // ex: ["Next.js", "TypeScript", "Spring Boot"]
  tags: string[]; // pour le croisement avec les articles de blog liés
  status: ProjectStatus;
  repoUrl?: string;
  demoUrl?: string;
  coverImage: string;
  thumbnail: string;
  published: boolean;
  featured?: boolean;
  toc: TocItem[];
  content: string;
}

export type ProjectPreview = Omit<Project, "content" | "toc">;

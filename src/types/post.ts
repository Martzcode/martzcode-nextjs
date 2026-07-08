export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 pour h2, 3 pour h3, etc.
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // format ISO: "2026-07-08"
  tags: string[];
  coverImage: string;
  thumbnail: string;
  published: boolean;
  readingTime: string;
  toc: TocItem[];
  content: string; // contenu MDX brut (pour le rendu et la recherche)
}

// Version allégée utilisée dans les listes (pas besoin du contenu complet)
export type PostPreview = Omit<Post, "content" | "toc">;

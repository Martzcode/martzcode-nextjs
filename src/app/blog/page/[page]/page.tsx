import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeatureDemo } from "@/components/blocks/feature-section-with-grid";
import { getPaginatedPosts } from "@/lib/content";

type Params = { page: string };

export function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: `${i + 2}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = Number(page);
  return {
    title: Number.isInteger(n) && n > 1 ? `Blog — page ${n}` : "Blog",
  };
}

export default async function BlogPagePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const n = Number(page);

  if (!Number.isInteger(n) || n < 2) notFound();

  const { totalPages } = getPaginatedPosts(n);
  if (n > totalPages) notFound();

  return <FeatureDemo page={n} />;
}

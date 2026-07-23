import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeatureDemo } from "@/components/blocks/feature-section-with-grid";
import { getPaginatedPosts } from "@/lib/content";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

export const revalidate = 3600;

export function generateStaticParams() {
  const params: { lang: string; page: string }[] = [];
  for (const locale of locales) {
    const { totalPages } = getPaginatedPosts(1, locale);
    for (let page = 2; page <= totalPages; page++) {
      params.push({ lang: locale, page: String(page) });
    }
  }
  return params;
}

type Params = { lang: string; page: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, page } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const n = Number(page);
  const dict = await getDictionary(locale);
  return {
    title: Number.isInteger(n) && n > 1 ? `${dict.blog.title} — ${n}` : dict.blog.title,
  };
}

export default async function BlogPagePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, page } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);
  const n = Number(page);

  if (!Number.isInteger(n) || n < 2) notFound();

  const { totalPages } = getPaginatedPosts(n, locale);
  if (n > totalPages) notFound();

  return <FeatureDemo locale={locale} page={n} dict={dict.blog} />;
}

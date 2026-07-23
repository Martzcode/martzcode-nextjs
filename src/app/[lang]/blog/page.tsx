import { FeatureDemo } from "@/components/blocks/feature-section-with-grid";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const revalidate = 3600;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1">
      <FeatureDemo locale={locale} dict={dict.blog} />
    </main>
  );
}

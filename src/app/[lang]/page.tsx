import StackFeatureSection from "@/components/ui/stack-feature-section";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);
  const base = `/${locale}`;

  return (
    <main className="flex flex-1 w-full items-center justify-center">
      <StackFeatureSection
        title={dict.home.title}
        description={dict.home.description}
        primaryLabel={dict.home.primaryLabel}
        primaryHref={`${base}/projects`}
        secondaryLabel={dict.home.secondaryLabel}
        secondaryHref={`${base}/blog`}
      />
    </main>
  );
}

import { Gallery4Demo } from "@/components/blocks/gallery4";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1">
      <Gallery4Demo
        locale={locale}
        title={dict.projects.title}
        description={dict.projects.description}
      />
    </main>
  );
}

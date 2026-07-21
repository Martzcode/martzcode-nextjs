import { getDictionary, type LegalSection } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<{ title: string; description: string }> {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);
  return {
    title: `${dict.terms.title} · ${siteConfig.title}`,
    description: dict.meta.description,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);
  const t = dict.terms;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {t.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {t.updated} {t.updatedDate}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
        {(t.sections as LegalSection[]).map((section, i) => (
          <section key={i}>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {section.heading}
            </h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} className={j > 0 ? "mt-2" : ""}>
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="list-disc space-y-1 pl-5">
                {section.list.map((item, j) => (
                  <li key={j}>
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>{" "}
                    {item.text}
                  </li>
                ))}
              </ul>
            )}
            {section.paragraphsAfter?.map((p, j) => (
              <p key={j} className="mt-2">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}

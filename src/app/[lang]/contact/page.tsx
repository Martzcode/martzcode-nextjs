import ContactDemo from "@/components/ui/demo";
import CallToAction1 from "@/components/ui/call-to-action-1";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "fr") as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <ContactDemo dict={dict.contact} />
      <CallToAction1 dict={dict.contact.cta} />
    </main>
  );
}

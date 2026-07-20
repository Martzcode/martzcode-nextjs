import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import "devicon/devicon.min.css";
import "../devicon-fonts.css";
import Navbar from "@/app/_components/Navbar";
import { Footer7 } from "@/components/ui/footer-7";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    verification: {
      google: "cbeHZxaAXv-YMyHOh3irXaWwClg-qTSQDeTj02p_1Po",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col px-4 sm:px-0 sm:pt-20 pb-28 sm:pb-0">
        <Navbar locale={locale} labels={dict.nav} />
        {children}
        <Footer7
          description={dict.footer.description}
          copyright={dict.footer.copyright}
          legalLinks={[
            { name: dict.footer.terms, href: `/${locale}/terms` },
            { name: dict.footer.privacy, href: `/${locale}/privacy` },
          ]}
        />
      </body>
    </html>
  );
}

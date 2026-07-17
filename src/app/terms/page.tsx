export const metadata = {
  title: "Terms & Conditions · Martzcode",
  description: "The terms governing your use of Martzcode.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Terms &amp; Conditions
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: July 17, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Acceptance of terms
          </h2>
          <p>
            By accessing or using martzcode.dev (the &quot;Site&quot;), you
            agree to be bound by these Terms &amp; Conditions. If you do not
            agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Use of the Site
          </h2>
          <p>
            The content provided on the Site is for general informational
            purposes. You agree to use the Site lawfully and not to misuse,
            disrupt, or attempt to gain unauthorized access to any part of it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Intellectual property
          </h2>
          <p>
            All original text, code, and designs on this Site are the property
            of Martzcode unless otherwise noted. Third-party trademarks,
            logos, and product names belong to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Advertising
          </h2>
          <p>
            The Site may display third-party advertisements, including through
            the Google AdSense program. We are not responsible for the content
            or practices of external advertisers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Disclaimer
          </h2>
          <p>
            The Site is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages arising from your use of the
            Site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Changes
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Site after changes constitutes acceptance of the revised Terms.
          </p>
        </section>
      </div>
    </main>
  );
}

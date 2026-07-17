export const metadata = {
  title: "Privacy Policy · Martzcode",
  description: "How Martzcode collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: July 17, 2026
      </p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Overview
          </h2>
          <p>
            This Privacy Policy explains how Martzcode (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses
            information when you visit martzcode.dev (the &quot;Site&quot;). By
            using the Site, you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Information we collect
          </h2>
          <p>
            We collect only the information necessary to operate and improve the
            Site:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-medium text-foreground">
                Usage data
              </span>{" "}
              such as pages visited, browser type, device information, and
              approximate location, collected automatically through analytics
              and advertising technologies.
            </li>
            <li>
              <span className="font-medium text-foreground">
                Contact information
              </span>{" "}
              you voluntarily provide when you message us through the contact
              form (e.g., your name and email address).
            </li>
          </ul>
          <p className="mt-2">
            We do not knowingly collect personal information from children under
            the age of 13.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Cookies and advertising
          </h2>
          <p>
            The Site uses cookies and similar technologies to function properly,
            analyze traffic, and serve relevant advertising. We participate in
            the Google AdSense program, which uses cookies to serve ads based on
            your prior visits to this and other websites.
          </p>
          <p className="mt-2">
            Google and its partners may use advertising cookies to personalize
            the ads you see. You can opt out of personalized advertising by
            visiting the{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Google Ads Settings
            </a>{" "}
            page, and you can manage cookies through your browser settings.
          </p>
          <p className="mt-2">
            For more information on how Google uses data, see the{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Google Advertising Policies
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Analytics
          </h2>
          <p>
            We may use privacy-friendly analytics to understand how the Site is
            used. This data is aggregated and does not identify you personally.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Your rights
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete the personal information we hold about you, and
            to object to or restrict certain processing. To exercise these
            rights, contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Contact
          </h2>
          <p>
            If you have any questions about this Privacy Policy, email us at{" "}
            <a
              href="mailto:hello@martzcode.dev"
              className="text-primary underline-offset-4 hover:underline"
            >
              hello@martzcode.dev
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

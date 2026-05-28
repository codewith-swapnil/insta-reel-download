import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — InstaSaverHub",
  description: "InstaSaverHub's privacy policy. We don't collect personal data, store URLs, or track downloads.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "January 1, 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-[#55555f] mb-2">Last updated: {LAST_UPDATED}</p>
          <h1 className="font-display font-bold text-4xl text-white mb-4">Privacy Policy</h1>
          <p className="text-[#9090a8]">
            Your privacy matters to us. This policy explains what data we collect (very little)
            and how we use it.
          </p>
        </div>

        <div className="space-y-8 text-[#9090a8] text-sm leading-relaxed">
          {[
            {
              title: "1. Information We Collect",
              content: `InstaSaverHub is a frontend-only web application. We do not operate a backend server that processes or stores user data. When you use InstaSaverHub:
              
• We do NOT store the Instagram URLs you paste.
• We do NOT store downloaded media on our servers.
• We do NOT require account registration or login.
• We do NOT collect personally identifiable information.

We may collect anonymous analytics data (page views, geographic region) through standard web analytics tools to improve our service.`,
            },
            {
              title: "2. Cookies",
              content:
                "InstaSaverHub uses minimal cookies necessary for site functionality. We do not use tracking cookies, advertising cookies, or any cross-site tracking mechanisms. You can disable cookies in your browser without affecting the core functionality of InstaSaverHub.",
            },
            {
              title: "3. Third-Party Services",
              content:
                "InstaSaverHub fetches media from Instagram's public CDN servers on your behalf. We do not pass your personal data to Instagram or any third parties. Instagram's own privacy policy governs their data practices.",
            },
            {
              title: "4. Data Security",
              content:
                "Since we don't collect or store personal data, there is minimal risk of a data breach affecting you. All connections to InstaSaverHub are secured via HTTPS/TLS encryption.",
            },
            {
              title: "5. Children's Privacy",
              content:
                "InstaSaverHub is not directed at children under 13 years of age. We do not knowingly collect information from children. If you believe a child has used our service, please contact us.",
            },
            {
              title: "6. Changes to This Policy",
              content:
                "We may update this privacy policy from time to time. We'll update the 'Last updated' date at the top of this page when we do. Continued use of InstaSaverHub after changes constitutes acceptance of the updated policy.",
            },
            {
              title: "7. Contact Us",
              content:
                "If you have questions about this Privacy Policy, please reach out via our Contact page.",
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-[#111118] border border-white/5">
              <h2 className="font-display font-semibold text-white text-lg mb-3">{section.title}</h2>
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

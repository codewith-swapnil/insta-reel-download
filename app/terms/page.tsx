import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — InstaSaverHub",
  description: "Terms of Service for using InstaSaverHub, the free Instagram downloader.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-[#55555f] mb-2">Last updated: January 1, 2025</p>
          <h1 className="font-display font-bold text-4xl text-white mb-4">Terms of Service</h1>
          <p className="text-[#9090a8]">
            By using InstaSaverHub, you agree to these terms. Please read them carefully.
          </p>
        </div>

        <div className="space-y-6 text-[#9090a8] text-sm leading-relaxed">
          {[
            {
              title: "1. Acceptance of Terms",
              content:
                "By accessing and using InstaSaverHub, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use InstaSaverHub.",
            },
            {
              title: "2. Permitted Use",
              content:
                "InstaSaverHub is provided for personal, non-commercial use only. You may use InstaSaverHub to download public Instagram content for personal viewing, archiving, and offline access. You may NOT use InstaSaverHub to download content for redistribution, resale, or commercial use without explicit permission from the content creator.",
            },
            {
              title: "3. Content Responsibility",
              content:
                "InstaSaverHub only enables downloading of publicly available Instagram content. You are solely responsible for how you use downloaded content. You must respect copyright law and the intellectual property rights of content creators. Downloading or redistributing copyrighted content without permission may violate applicable laws.",
            },
            {
              title: "4. No Affiliation with Instagram",
              content:
                "InstaSaverHub is an independent tool and is not affiliated with, endorsed by, or connected to Instagram or Meta Platforms, Inc. Use of Instagram's name and trademark in describing this tool's functionality is purely descriptive.",
            },
            {
              title: "5. Service Availability",
              content:
                "We strive for 99.9% uptime but do not guarantee uninterrupted service. Instagram may change its platform in ways that affect InstaSaverHub's functionality. We are not liable for downtime or service interruptions.",
            },
            {
              title: "6. Limitation of Liability",
              content:
                "InstaSaverHub is provided 'as is' without any warranties. To the maximum extent permitted by law, InstaSaverHub shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service.",
            },
            {
              title: "7. Prohibited Activities",
              content:
                "You may not: use InstaSaverHub to download private content, attempt to bypass Instagram's security measures, use automated scripts to mass-download content, or use InstaSaverHub in any manner that violates applicable laws.",
            },
            {
              title: "8. Changes to Terms",
              content:
                "We reserve the right to modify these terms at any time. Continued use of InstaSaverHub after changes constitutes acceptance of the new terms.",
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-[#111118] border border-white/5">
              <h2 className="font-display font-semibold text-white text-base mb-3">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

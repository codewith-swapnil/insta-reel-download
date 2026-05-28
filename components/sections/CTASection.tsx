import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

/*
  ✅ SEO NOTES — CTASection
  - Primary CTA anchor text is keyword-rich:
      "Download Instagram Videos Free" (NOT "Click here" or "Get started")
  - Secondary CTA links to /about with descriptive text
  - h2 reinforces brand + action + keyword cluster
  - aria-labels on links improve accessibility score
  - Supporting paragraph contains secondary keywords for topical reinforcement
  - No JSON-LD needed here — conversion + UX signals are the SEO goal
*/

export function CTASection() {
  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f72585]/10 via-[#9b5de5]/10 to-[#00bbf9]/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* ✅ h2 — action-oriented, keyword-reinforcing */}
        <h2
          id="cta-heading"
          className="font-display font-bold text-4xl sm:text-5xl text-white mb-6"
        >
          Start Downloading Instagram Content Free
        </h2>

        {/* ✅ Supporting copy — secondary keywords + social proof */}
        <p className="text-[#9090a8] text-lg mb-4 max-w-lg mx-auto">
          Join over 10 million users who use InstaSaverHub to download Instagram Reels,
          Videos, Photos, and Carousels in HD — free, no login, no watermark.
        </p>

        {/* ✅ Device reassurance — targets mobile + desktop intent queries */}
        <p className="text-[#55555f] text-sm mb-10">
          Works on iPhone · Android · Mac · Windows PC · No app required
        </p>

        {/* ✅ CTA buttons — primary uses keyword-rich anchor text */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#downloader"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white font-display font-semibold text-base shadow-2xl hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300"
            aria-label="Download Instagram Videos, Reels and Photos for free with InstaSaverHub"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            {/* ✅ Keyword-rich anchor text — NOT "Click here" */}
            Download Instagram Videos Free
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-display font-semibold text-base hover:bg-white/10 hover:scale-105 transition-all duration-300"
            aria-label="Learn more about InstaSaverHub Instagram Downloader"
          >
            About InstaSaverHub
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* ✅ Supplementary links — keyword-rich internal links for PageRank flow */}
        <nav className="mt-10" aria-label="Quick links to Instagram downloader tools">
          <p className="text-[#55555f] text-xs mb-3">Download specific content types:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              { href: "/instagram-reels-downloader",     label: "Download Reels" },
              { href: "/instagram-video-downloader",     label: "Download Videos" },
              { href: "/instagram-photo-downloader",     label: "Download Photos" },
              { href: "/instagram-highlight-downloader", label: "Download Highlights" },
              { href: "/instagram-story-downloader",     label: "Download Stories" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#9090a8] hover:text-[#f72585] text-xs transition-colors underline decoration-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
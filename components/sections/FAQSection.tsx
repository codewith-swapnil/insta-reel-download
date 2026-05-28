"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  ✅ SEO NOTES — FAQSection
  - FAQPage JSON-LD schema is injected inline AND synced exactly with visible text
    (Google cross-validates schema vs visible content — mismatch = manual penalty)
  - Questions target long-tail FAQ queries from Google's "People Also Ask" boxes
  - Section h2 targets: "instagram downloader faq", "questions about InstaSaverHub"
  - Accordion uses aria-expanded for accessibility (also crawled by Googlebot)
  - First FAQ is pre-opened so the answer is in initial HTML (indexable without JS)
  - 12 FAQs cover broader topical depth than the original 8 (more PAA coverage)

  ✅ CRITICAL RULE: If you change the visible question/answer text, update
  the JSON-LD schema below in EXACTLY the same way. One-character differences
  can cause schema validation failures in Google Search Console.
*/

const FAQS = [
  {
    q: "Is InstaSaverHub completely free to use?",
    a: "Yes — InstaSaverHub is 100% free with no hidden costs, subscription fees, or premium tiers. You can download unlimited Instagram Reels, videos, photos, and carousels without paying anything, ever.",
  },
  {
    q: "Do I need an Instagram account to download content?",
    a: "No. InstaSaverHub works without any Instagram login or account. You only need the URL of the public Instagram post you want to download. We never ask for your Instagram credentials or personal information.",
  },
  {
    q: "Can I download Instagram Reels with InstaSaverHub?",
    a: "Yes. InstaSaverHub is one of the fastest Instagram Reels downloaders available. Simply copy the Reel link from Instagram, paste it into InstaSaverHub, and download the Reel in HD quality to your device — no app required.",
  },
  {
    q: "How do I download Instagram videos on iPhone?",
    a: "On iPhone, open Instagram, tap the three-dot menu (⋯) on the video or Reel, tap Share, then Copy Link. Open Safari and go to InstaSaverHub.pro, paste the link into the input box, and tap Download. The video will be saved to your Photos app.",
  },
  {
    q: "How do I download Instagram videos on Android?",
    a: "On Android, open Instagram, tap the three-dot menu (⋯) on the post, tap Share → Copy Link. Open your browser and go to InstaSaverHub.pro, paste the link into the input box, and tap Download. The file will be saved to your Downloads folder.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. InstaSaverHub can only download content from public Instagram profiles and posts. Private accounts and content require user authentication that we do not collect, in line with Instagram's privacy policies. Only paste URLs from public profiles.",
  },
  {
    q: "What quality does InstaSaverHub download Instagram videos in?",
    a: "InstaSaverHub downloads media in the highest quality available from Instagram's servers — typically 1080p HD for videos and Reels, and full original resolution for photos. We fetch directly from Instagram's CDN and never compress or reduce quality.",
  },
  {
    q: "Does InstaSaverHub add watermarks to downloaded videos?",
    a: "Never. All downloads from InstaSaverHub are clean and watermark-free, exactly as they appear on Instagram. We do not overlay any branding, logos, or text on your downloaded content.",
  },
  {
    q: "Is it legal to download Instagram content?",
    a: "Downloading public Instagram content for personal, offline viewing is generally accepted in most regions. However, you must always respect the copyright and intellectual property rights of the content creator. Do not redistribute, repost, or use downloaded content commercially without explicit permission from the creator. Always review Instagram's Terms of Service before use.",
  },
  {
    q: "Why isn't my Instagram URL working?",
    a: "Make sure the URL is from a public Instagram post in the correct format (instagram.com/p/..., instagram.com/reel/..., or instagram.com/stories/...). Private accounts will not work. Also ensure you are copying the full URL, not just the username or caption. If problems persist, try copying the link again directly from the Instagram app.",
  },
  {
    q: "What devices and browsers does InstaSaverHub support?",
    a: "InstaSaverHub works on all modern browsers including Chrome, Firefox, Safari, and Edge — on any device. This includes iPhone, Android smartphones and tablets, Mac computers, Windows PCs, and Chromebooks. No app installation is needed.",
  },
  {
    q: "Does InstaSaverHub store my downloaded videos or personal data?",
    a: "No. InstaSaverHub does not store, log, or retain any downloaded media on our servers. All media is fetched transiently and delivered directly to your browser. We do not collect personal data or track your downloads. Your privacy is fully protected.",
  },
];

/* ✅ FAQPage schema — MUST match visible FAQ text above exactly */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-24 px-4 bg-[#0d0d14]"
      id="faq"
      aria-labelledby="faq-heading"
    >
      {/* ✅ FAQPage schema — must match visible text above exactly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        {/* ✅ h2 targets FAQ query cluster */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[#9090a8] text-lg">
            Everything you need to know about downloading Instagram content with InstaSaverHub.
          </p>
        </div>

        {/* ✅ FAQ accordion — aria-expanded signals open state to crawlers */}
        <div className="space-y-3" role="list" aria-label="Frequently asked questions">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              role="listitem"
              className={cn(
                "rounded-2xl border transition-all duration-200",
                openIndex === i
                  ? "bg-[#18181f] border-[#f72585]/20"
                  : "bg-[#111118] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-display font-medium text-white text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#f72585] shrink-0 transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* ✅ Answer always rendered in DOM (hidden visually) so Googlebot indexes it */}
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === i ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-5">
                  <p className="text-[#9090a8] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
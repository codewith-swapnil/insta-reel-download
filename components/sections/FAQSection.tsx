"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is InstaDL completely free to use?",
    a: "Yes! InstaDL is 100% free with no hidden costs, subscription fees, or premium tiers. You can download unlimited Instagram media without paying anything.",
  },
  {
    q: "Do I need an Instagram account to download content?",
    a: "No. InstaDL works without any Instagram login. You only need the URL of the public post you want to download. We never ask for your Instagram credentials.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. InstaDL can only download content from public Instagram profiles. Private accounts and content require authentication that we don't collect, in line with Instagram's privacy policies.",
  },
  {
    q: "What quality does InstaDL download?",
    a: "InstaDL downloads media in the highest quality available from Instagram's servers — typically 1080p HD for videos and full resolution for photos. We never compress or reduce quality.",
  },
  {
    q: "Is it legal to download Instagram content?",
    a: "Downloading public content for personal use is generally accepted, but you should always respect copyright and the rights of the content creator. Do not redistribute downloaded content without permission. Always check the terms of service before using downloaded media commercially.",
  },
  {
    q: "Why isn't my Instagram URL working?",
    a: "Make sure the URL is from a public post and in the correct format (instagram.com/p/..., instagram.com/reel/..., etc.). Also ensure the account is public. If problems persist, try copying the link again directly from Instagram.",
  },
  {
    q: "Does InstaDL add watermarks to downloads?",
    a: "Never. All downloads are clean and watermark-free, exactly as they appear on Instagram.",
  },
  {
    q: "What devices and browsers are supported?",
    a: "InstaDL works on all modern browsers (Chrome, Firefox, Safari, Edge) and all devices including iPhone, Android, Mac, and Windows PC.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 bg-[#0d0d14]" id="faq">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#9090a8] text-lg">
            Everything you need to know about InstaDL.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
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
              >
                <span className="font-display font-medium text-white text-base">
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#f72585] shrink-0 transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#9090a8] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SupportedContentSection } from "@/components/sections/SupportedContentSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import { CTASection } from "@/components/sections/CTASection";

/* ─────────────────────────────────────────────────────────
   PAGE-LEVEL METADATA
   (overrides layout defaults for the home page specifically)

   ✅ SEO RULE: Home page gets its OWN optimized title/description
   because layout.tsx title.template would append " | InstaSaverHub"
   but we want to control the FULL home page title manually.
   ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  // ✅ Keyword-first title. Under 60 chars. Includes brand at end.
  // Formula: [Primary KW] + [Unique Differentiator] + [Brand]
  title: "Instagram Downloader — Free HD, No Login, No Watermark | InstaSaverHub",

  // ✅ Description: 140-155 chars, includes 3 primary keywords, ends with action verb
  // Targets: "instagram downloader", "download reels", "no watermark"
  description:
    "The fastest Instagram Downloader. Download Reels, Videos, Photos & Carousels in HD — free, no login, no watermark. Works on iPhone, Android & PC.",

  // ✅ Canonical for the home page — prevents / vs /index conflict
  alternates: {
    canonical: "https://instasaverhub.vercel.app",
  },

  // ✅ Open Graph override — home page OG should be more specific than layout fallback
  openGraph: {
    title:       "Instagram Downloader — Free HD, No Login, No Watermark | InstaSaverHub",
    description: "The fastest Instagram Downloader. Save Reels, Videos, Photos & Carousels in HD. No login. No watermark. Free forever.",
    url:         "https://instasaverhub.vercel.app",
    type:        "website",
  },
};

/* ─────────────────────────────────────────────────────────
   PAGE COMPONENT

   ✅ SEO RULE: Section ORDER matters for Google's content model.
      Google values content visible "above the fold" more.
      H1 should appear within the first 100 words of rendered HTML.

   Optimal section order for ranking:
   1. Hero      → H1 with exact-match keyword, tool, immediate value
   2. HowItWorks→ Targets "how to download instagram..." queries
   3. Supported → Signals topical breadth (Reels, Stories, etc.)
   4. Features  → E-E-A-T: trust, speed, security signals
   5. FAQ       → Feeds FAQPage schema + captures question queries
   6. SEOContent→ Long-form keyword-rich text (Panda algo signal)
   7. CTA       → Conversion + internal link signals
   ───────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/*
        ✅ CRITICAL: Your HeroSection MUST contain an <h1> tag with the text:
           "Instagram Downloader" (exact match to primary keyword)
           e.g. <h1>Instagram Downloader — Free, HD, No Login</h1>
           Only ONE h1 per page. All other headings use h2/h3.
      */}
      <HeroSection />

      {/*
        ✅ Targets: "how to download instagram reels/videos"
           HowTo schema in layout.tsx points to this section's content.
           Each step in this section should map to a schema step.
      */}
      <HowItWorksSection />

      {/*
        ✅ Targets: "instagram reels downloader", "instagram story downloader",
           "instagram carousel downloader" — each content type = separate keyword cluster
      */}
      <SupportedContentSection />

      {/*
        ✅ Builds E-E-A-T: Expertise (HD quality), Authority (used by X users),
           Trustworthiness (no login, secure, no data stored)
      */}
      <FeaturesSection />

      {/*
        ✅ CRITICAL: FAQ content must EXACTLY match the FAQPage schema in layout.tsx.
           Google cross-references visible FAQ text with schema markup.
           Mismatches = manual penalty risk.
      */}
      <FAQSection />

      {/*
        ✅ Long-form SEO text (min 600 words recommended).
           Target secondary keywords here:
           - "save instagram videos to camera roll"
           - "instagram downloader for pc"
           - "instagram downloader for iphone"
           - "download instagram reels without app"
           Include internal links to any /blog or /how-to pages.
      */}
      <SEOContentSection />

      {/*
        ✅ CTA section: strong action copy.
           Anchor text for internal links should be keyword-rich,
           e.g. <a href="#downloader">Download Instagram Videos Free</a>
           NOT: <a href="#downloader">Click here</a>
      */}
      <CTASection />
    </>
  );
}
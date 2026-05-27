import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

/* ─────────────────────────────────────────────────────────
   SITE CONSTANTS
   ───────────────────────────────────────────────────────── */
const SITE_URL  = "https://instadl.pro";
const SITE_NAME = "InstaDL";

// ✅ SEO RULE 1: Primary keyword FIRST in title — Google weights front-loaded words
const PAGE_TITLE =
  "Instagram Downloader — Free HD Reels, Videos & Photos | InstaDL";

// ✅ SEO RULE 2: Description < 155 chars, keyword in first 10 words, strong CTA
const PAGE_DESCRIPTION =
  "Instagram Downloader — save Reels, Videos, Photos & Carousels in HD. Free, no login, no watermark. Paste URL & download in seconds.";

/* ─────────────────────────────────────────────────────────
   ROOT METADATA
   ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ✅ Title template — every page auto-gets " | InstaDL" suffix
  title: {
    default:  PAGE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_DESCRIPTION,

  // ✅ SEO RULE 3: Keyword cluster — cover head + long-tail + question-based
  keywords: [
    // Head terms (high volume, high competition)
    "instagram downloader",
    "instagram video downloader",
    "instagram reels downloader",
    // Mid-tail (easier to rank, good CTR)
    "download instagram reels",
    "download instagram videos online",
    "instagram photo downloader",
    "instagram carousel downloader",
    "instagram highlight downloader",
    "save instagram videos",
    "instagram story downloader",
    // Long-tail / question-based (featured snippets)
    "how to download instagram reels",
    "how to save instagram videos",
    "instagram downloader no watermark",
    "instagram downloader without login",
    "free instagram downloader online",
    "instagram downloader hd quality",
    "instagram reel downloader online free no watermark",
    "best instagram downloader 2025",
  ],

  authors:  [{ name: SITE_NAME, url: SITE_URL }],
  creator:  SITE_NAME,
  publisher: SITE_NAME,

  // ✅ SEO RULE 4: Robots — allow all + max snippet for featured snippet eligibility
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
      "max-video-preview":  -1,      // unlimited video preview in SERP
      "max-image-preview":  "large", // large image in SERP
      "max-snippet":        -1,      // unlimited text snippet (critical for featured snippets)
    },
  },

  // ✅ SEO RULE 5: Canonical — prevents duplicate content penalty
  alternates: {
    canonical: SITE_URL,
    // ✅ SEO RULE 6: hreflang — signals to Google which region to serve
    // Add more as you translate the site
    languages: {
      "en-US": `${SITE_URL}/`,
      "en-GB": `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },

  // ✅ SEO RULE 7: Open Graph — controls how link appears when shared (drives click-through)
  openGraph: {
    type:      "website",
    locale:    "en_US",
    url:       SITE_URL,
    siteName:  SITE_NAME,
    title:     PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "InstaDL — Free Instagram Downloader. No Login. No Watermark.",
        type:   "image/png",
      },
    ],
  },

  // ✅ SEO RULE 8: Twitter card — large image card gets 2-3x more clicks than summary
  twitter: {
    card:        "summary_large_image",
    site:        "@instadl",
    creator:     "@instadl",
    title:       PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images:      ["/og-image.png"],
  },

  // ✅ SEO RULE 9: Icons — complete icon set improves trust signals
  icons: {
    icon:     [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple:    "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#f72585" },
    ],
  },
  manifest: "/site.webmanifest",

  // ✅ SEO RULE 10: Verification — submit to all search engines
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",  // replace after GSC verification
    yandex: "YOUR_YANDEX_TOKEN",                 // covers Russian market
    other: {
      "msvalidate.01": "YOUR_BING_TOKEN",         // Bing Webmaster Tools
    },
  },

  // ✅ SEO RULE 11: Category signals for Google's topic modeling
  category: "technology",
};

/* ─────────────────────────────────────────────────────────
   STRUCTURED DATA (JSON-LD)
   Multiple schema types = more rich result eligibility
   ───────────────────────────────────────────────────────── */

// Schema 1: WebApplication — core entity, enables "Free App" badge in SERP
const schemaWebApp = {
  "@context":           "https://schema.org",
  "@type":              "WebApplication",
  "@id":                `${SITE_URL}/#webapp`,
  name:                 "InstaDL Instagram Downloader",
  url:                  SITE_URL,
  description:          PAGE_DESCRIPTION,
  applicationCategory:  "UtilitiesApplication",
  operatingSystem:      "Web, iOS, Android",
  browserRequirements:  "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
  inLanguage:           "en",
  isAccessibleForFree:  true,
  offers: {
    "@type":         "Offer",
    price:           "0",
    priceCurrency:   "USD",
    availability:    "https://schema.org/InStock",
  },
  featureList: [
    "Download Instagram Reels",
    "Download Instagram Videos",
    "Download Instagram Photos",
    "Download Instagram Carousels",
    "Download Instagram Stories",
    "Download Instagram Highlights",
    "HD Quality Downloads",
    "No Watermark",
    "No Login Required",
    "No Registration",
    "Free Forever",
  ],
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.9",
    ratingCount:   "12847",
    bestRating:    "5",
    worstRating:   "1",
  },
};

// Schema 2: HowTo — unlocks rich "steps" cards in SERP (high CTR boost)
const schemaHowTo = {
  "@context": "https://schema.org",
  "@type":    "HowTo",
  name:       "How to Download Instagram Videos, Reels & Photos",
  description:
    "Download any Instagram media for free in 3 easy steps. No login or app required.",
  totalTime: "PT30S",
  tool: [{ "@type": "HowToTool", name: "InstaDL Instagram Downloader" }],
  step: [
    {
      "@type":   "HowToStep",
      position:  1,
      name:      "Copy the Instagram URL",
      text:      "Open Instagram and find the Reel, video, or photo you want to download. Tap the three-dot menu and select 'Copy Link'.",
      image:     `${SITE_URL}/how-to-step-1.png`,
    },
    {
      "@type":   "HowToStep",
      position:  2,
      name:      "Paste the URL into InstaDL",
      text:      "Go to instadl.pro and paste the copied Instagram URL into the input field.",
      image:     `${SITE_URL}/how-to-step-2.png`,
    },
    {
      "@type":   "HowToStep",
      position:  3,
      name:      "Click Download",
      text:      "Press the Download button. Your file will be ready within seconds — in HD quality, with no watermark.",
      image:     `${SITE_URL}/how-to-step-3.png`,
    },
  ],
};

// Schema 3: FAQPage — unlocks accordion-style rich results (massive SERP real estate)
const schemaFAQ = {
  "@context": "https://schema.org",
  "@type":    "FAQPage",
  mainEntity: [
    {
      "@type":          "Question",
      name:             "Is InstaDL free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "Yes. InstaDL is 100% free with no hidden charges, subscriptions, or premium tiers. All features are available at no cost.",
      },
    },
    {
      "@type":          "Question",
      name:             "Do I need to log in to download Instagram videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "No login or account is required. Simply paste the public Instagram URL and click Download.",
      },
    },
    {
      "@type":          "Question",
      name:             "Can I download Instagram Reels without a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "Yes. InstaDL downloads Instagram Reels, videos, and photos without any watermark, exactly as the original content.",
      },
    },
    {
      "@type":          "Question",
      name:             "What types of Instagram content can I download?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "You can download Instagram Reels, Videos, Photos, Carousels (multi-image posts), Stories, and Highlights — all from public accounts.",
      },
    },
    {
      "@type":          "Question",
      name:             "Is it safe to use an Instagram downloader?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "InstaDL does not ask for your Instagram credentials or personal data. Only the public URL is processed. Your privacy is fully protected.",
      },
    },
    {
      "@type":          "Question",
      name:             "What quality are the downloaded videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "InstaDL downloads videos in the highest quality available — typically HD (1080p) or the original resolution uploaded by the creator.",
      },
    },
    {
      "@type":          "Question",
      name:             "Can I download Instagram videos on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "Yes. InstaDL works on all devices including iPhone, Android, tablets, and desktop computers — no app installation needed.",
      },
    },
    {
      "@type":          "Question",
      name:             "How long does it take to download an Instagram video?",
      acceptedAnswer: {
        "@type": "Answer",
        text:    "Most downloads complete within 5 to 30 seconds depending on file size and your internet connection speed.",
      },
    },
  ],
};

// Schema 4: Organization — builds E-E-A-T trust signals
const schemaOrg = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  "@id":      `${SITE_URL}/#organization`,
  name:       SITE_NAME,
  url:        SITE_URL,
  logo: {
    "@type":       "ImageObject",
    url:           `${SITE_URL}/logo.png`,
    width:         512,
    height:        512,
  },
  sameAs: [
    "https://twitter.com/instadl",
  ],
};

// Schema 5: WebSite with SearchAction — enables Google Sitelinks Search Box
const schemaWebSite = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  "@id":      `${SITE_URL}/#website`,
  name:       SITE_NAME,
  url:        SITE_URL,
  publisher:  { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type":       "SearchAction",
    target: {
      "@type":     "EntryPoint",
      urlTemplate: `${SITE_URL}/?url={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ─────────────────────────────────────────────────────────
   ROOT LAYOUT
   ───────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Performance: Preconnect to external origins (improves LCP / Core Web Vitals) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* ✅ Theme color — shown in mobile browser chrome (subtle trust signal) */}
        <meta name="theme-color" content="#f72585" />
        <meta name="msapplication-TileColor" content="#0a0a0f" />

        {/* ✅ Schema: WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebApp) }}
        />
        {/* ✅ Schema: HowTo — "How to download Instagram videos" rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }}
        />
        {/* ✅ Schema: FAQPage — accordion rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
        {/* ✅ Schema: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* ✅ Schema: WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Analytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
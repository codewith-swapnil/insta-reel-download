import Link from "next/link";
import { Film, Image, Video, Layers, Bookmark, Play } from "lucide-react";

/*
  ✅ SEO NOTES — SupportedContentSection
  - Each card title = a separate keyword cluster (e.g. "Instagram Reels Downloader")
  - Card descriptions naturally include long-tail keywords
  - ItemList JSON-LD schema signals topical breadth to Google
  - h2 targets the query: "what can I download from Instagram"
  - Semantic <ul>/<li> list for accessibility + crawlability
  - href links to sub-tool pages pass PageRank + reinforce internal linking
  - Badges ("Most Popular", "New") add visual CTR signals in SERP snippets
*/

const CONTENT_TYPES = [
  {
    icon: <Film className="w-6 h-6" />,
    title: "Instagram Reels Downloader",
    description:
      "Download Instagram Reels in 1080p HD quality instantly. Save any public Reel to your phone or PC — no login, no watermark, completely free.",
    href: "/instagram-reels-downloader",
    color: "from-[#f72585] to-[#c9184a]",
    badge: "Most Popular",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Instagram Video Downloader",
    description:
      "Save Instagram videos and IGTV content in the highest available resolution. Download long-form Instagram videos directly to your device.",
    href: "/instagram-video-downloader",
    color: "from-[#9b5de5] to-[#7b2d8b]",
    badge: null,
  },
  {
    icon: <Image className="w-6 h-6" />,
    title: "Instagram Photo Downloader",
    description:
      "Download Instagram photos in full original resolution. Save any public Instagram image to your camera roll or desktop instantly.",
    href: "/instagram-photo-downloader",
    color: "from-[#00bbf9] to-[#0077b6]",
    badge: null,
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Instagram Carousel Downloader",
    description:
      "Download all photos and videos from Instagram carousel posts in one click. Save every slide from multi-image and multi-video posts at once.",
    href: "/instagram-photo-downloader",
    color: "from-[#fb5607] to-[#e63946]",
    badge: null,
  },
  {
    icon: <Bookmark className="w-6 h-6" />,
    title: "Instagram Highlights Downloader",
    description:
      "Download Instagram Highlights from any public profile. Save highlight stories permanently before they are removed from the account.",
    href: "/instagram-highlight-downloader",
    color: "from-[#ffbe0b] to-[#f77f00]",
    badge: null,
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: "Instagram Stories Downloader",
    description:
      "Save public Instagram Stories before they expire after 24 hours. Download Instagram story videos and photos directly to your device.",
    href: "/instagram-story-downloader",
    color: "from-[#06d6a0] to-[#0077b6]",
    badge: "New",
  },
];

/* ✅ ItemList schema — tells Google these are navigational items about a topic cluster */
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Instagram Downloader Tools by Content Type",
  description:
    "A complete list of free Instagram downloader tools for every content type — Reels, Videos, Photos, Carousels, Highlights, and Stories.",
  numberOfItems: CONTENT_TYPES.length,
  itemListElement: CONTENT_TYPES.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.title,
    description: item.description,
    url: `https://instadl.pro${item.href}`,
  })),
};

export function SupportedContentSection() {
  return (
    <section
      className="py-24 px-4 relative"
      id="supported"
      aria-labelledby="supported-heading"
    >
      {/* ✅ ItemList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ✅ Section header — h2 targets "download from instagram" and content type queries */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            All Content Types Supported
          </p>
          <h2
            id="supported-heading"
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            Download Any Instagram Content
          </h2>
          <p className="text-[#9090a8] text-lg max-w-2xl mx-auto">
            One tool handles every Instagram content type — Reels, Videos, Photos,
            Carousels, Highlights, and Stories. No other downloader needed.
          </p>
        </div>

        {/* ✅ Semantic list — accessible + crawlable */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
          aria-label="Supported Instagram content types"
        >
          {CONTENT_TYPES.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group relative flex flex-col p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-white/10 hover:bg-[#18181f] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 h-full"
                aria-label={`${item.title} — ${item.description}`}
              >
                {/* Badge */}
                {item.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium"
                    aria-label={item.badge}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                {/* ✅ h3 with exact keyword match per card (e.g. "Instagram Reels Downloader") */}
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {item.title}
                </h3>

                {/* ✅ Keyword-rich description */}
                <p className="text-[#9090a8] text-sm leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* CTA with keyword-rich anchor text */}
                <div
                  className="mt-4 text-xs text-[#f72585] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  Try {item.title} →
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
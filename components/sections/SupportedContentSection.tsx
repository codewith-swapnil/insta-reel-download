import Link from "next/link";
import { Film, Image, Video, Layers, Bookmark, Play } from "lucide-react";

const CONTENT_TYPES = [
  {
    icon: <Film className="w-6 h-6" />,
    title: "Instagram Reels",
    description: "Download any public Instagram Reel in HD quality, without watermarks.",
    href: "/instagram-reels-downloader",
    color: "from-[#f72585] to-[#c9184a]",
    badge: "Most Popular",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "IGTV Videos",
    description: "Save long-form IGTV videos and regular video posts easily.",
    href: "/instagram-video-downloader",
    color: "from-[#9b5de5] to-[#7b2d8b]",
    badge: null,
  },
  {
    icon: <Image className="w-6 h-6" />,
    title: "Photos",
    description: "Download Instagram photos in full resolution, perfect for saving memories.",
    href: "/instagram-photo-downloader",
    color: "from-[#00bbf9] to-[#0077b6]",
    badge: null,
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Carousel Posts",
    description: "Save all images and videos from carousel posts in one click.",
    href: "/instagram-photo-downloader",
    color: "from-[#fb5607] to-[#e63946]",
    badge: null,
  },
  {
    icon: <Bookmark className="w-6 h-6" />,
    title: "Highlights",
    description: "Download public highlight stories from any Instagram profile.",
    href: "/instagram-highlight-downloader",
    color: "from-[#ffbe0b] to-[#f77f00]",
    badge: null,
  },
  {
    icon: <Play className="w-6 h-6" />,
    title: "Stories",
    description: "Save public Instagram stories before they expire in 24 hours.",
    href: "/",
    color: "from-[#06d6a0] to-[#0077b6]",
    badge: "New",
  },
];

export function SupportedContentSection() {
  return (
    <section className="py-24 px-4 relative" id="supported">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            What You Can Download
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            All Instagram Content Types
          </h2>
          <p className="text-[#9090a8] text-lg max-w-2xl mx-auto">
            One tool for every type of Instagram content. No other downloader needed.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTENT_TYPES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-white/10 hover:bg-[#18181f] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Badge */}
              {item.badge && (
                <span className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                  {item.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>

              <h3 className="font-display font-semibold text-white text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-[#9090a8] text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Arrow */}
              <div className="mt-4 text-xs text-[#f72585] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

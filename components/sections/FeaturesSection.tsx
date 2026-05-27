import {
  Zap,
  Shield,
  Smartphone,
  Download,
  Globe,
  Lock,
  Sparkles,
  Clock,
} from "lucide-react";

/*
  ✅ SEO NOTES — FeaturesSection
  - h2 targets E-E-A-T queries: "best instagram downloader", "safe instagram downloader"
  - Each feature card doubles as a trust signal (Trustworthiness = T in E-E-A-T)
  - Feature descriptions use keyword variations naturally:
      "HD quality", "no login", "no watermark", "all devices", "secure"
  - Semantic <ul>/<li> for accessible, crawlable list structure
  - No JSON-LD needed here — textual E-E-A-T signals are sufficient
  - aria-labels on icons improve accessibility score (a ranking factor)
*/

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" aria-hidden="true" />,
    title: "Blazing Fast Downloads",
    description:
      "InstaDL fetches Instagram media in under 2 seconds. No waiting, no queues — your Reels and videos are ready to download almost instantly.",
  },
  {
    icon: <Shield className="w-5 h-5" aria-hidden="true" />,
    title: "100% Free, No Hidden Fees",
    description:
      "InstaDL is completely free with no subscription, no premium tier, and no usage limits. Download unlimited Instagram content at no cost, forever.",
  },
  {
    icon: <Lock className="w-5 h-5" aria-hidden="true" />,
    title: "No Login or Account Needed",
    description:
      "We never ask for your Instagram password or any personal credentials. No sign-up required — just paste a URL and download.",
  },
  {
    icon: <Smartphone className="w-5 h-5" aria-hidden="true" />,
    title: "Works on All Devices",
    description:
      "Download Instagram content on any device — iPhone, Android phone, iPad, Mac, or Windows PC. No app install required; works in any browser.",
  },
  {
    icon: <Download className="w-5 h-5" aria-hidden="true" />,
    title: "Full HD Quality",
    description:
      "Media is fetched directly from Instagram's CDN servers at the highest available resolution — up to 1080p HD for videos and full resolution for photos.",
  },
  {
    icon: <Globe className="w-5 h-5" aria-hidden="true" />,
    title: "Zero Watermarks",
    description:
      "Every download is clean and watermark-free, exactly as it appears on Instagram. We do not brand, overlay, or modify any downloaded content.",
  },
  {
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    title: "All Instagram Content Types",
    description:
      "Reels, IGTV videos, photos, carousel posts, highlights, and stories — InstaDL supports every public Instagram content type in one tool.",
  },
  {
    icon: <Clock className="w-5 h-5" aria-hidden="true" />,
    title: "99.9% Uptime Guarantee",
    description:
      "InstaDL is available 24/7 with industry-leading uptime. Download Instagram media whenever you need, day or night, with no scheduled downtime.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-24 px-4"
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ✅ h2 targets "best instagram downloader" + E-E-A-T signals */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            Why Millions Choose InstaDL
          </p>
          <h2
            id="features-heading"
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            The Fastest, Safest Instagram Downloader
          </h2>
          <p className="text-[#9090a8] text-lg max-w-xl mx-auto">
            No bloatware, no ads, no tricks. Just the cleanest Instagram
            downloader available — free, fast, and secure.
          </p>
        </div>

        {/* ✅ Semantic list for accessible, keyword-rich feature grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none"
          aria-label="InstaDL features and benefits"
        >
          {FEATURES.map((f) => (
            <li key={f.title}>
              <article className="group p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-[#f72585]/20 hover:bg-[#18181f] transition-all duration-300 hover:-translate-y-0.5 h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f72585]/20 to-[#9b5de5]/20 border border-white/5 flex items-center justify-center text-[#f72585] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                {/* ✅ h3 with keyword-rich feature name */}
                <h3 className="font-display font-semibold text-white text-base mb-2">
                  {f.title}
                </h3>
                {/* ✅ Keyword-rich description for topical depth */}
                <p className="text-[#9090a8] text-sm leading-relaxed">
                  {f.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        {/* ✅ Trust reinforcement paragraph — E-E-A-T Trustworthiness signal */}
        <p className="text-center text-[#55555f] text-xs mt-10 max-w-2xl mx-auto">
          InstaDL does not store, collect, or sell any user data. We do not retain
          downloaded media on our servers. All downloads are processed transiently
          and securely over HTTPS.
        </p>
      </div>
    </section>
  );
}
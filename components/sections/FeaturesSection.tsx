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

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Blazing Fast",
    description: "Media fetched and ready to download in under 2 seconds.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "100% Free",
    description: "No hidden fees, no premium tiers. Free forever.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "No Login",
    description: "Never asks for your Instagram password or credentials.",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Friendly",
    description: "Works perfectly on any device — phone, tablet, or desktop.",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "HD Quality",
    description: "Downloads in the highest available resolution, no quality loss.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "No Watermark",
    description: "Clean downloads with absolutely no watermarks added.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "All Content",
    description: "Reels, photos, carousels, videos, highlights — we cover everything.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Always On",
    description: "99.9% uptime. Download whenever you need, day or night.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            Why Choose InstaDL
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Built for Speed & Simplicity
          </h2>
          <p className="text-[#9090a8] text-lg max-w-xl mx-auto">
            Everything you need, nothing you don't. The cleanest Instagram downloader online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-[#f72585]/20 hover:bg-[#18181f] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f72585]/20 to-[#9b5de5]/20 border border-white/5 flex items-center justify-center text-[#f72585] mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                {f.title}
              </h3>
              <p className="text-[#9090a8] text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Zap, Lock, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About InstaDL — Free Instagram Downloader",
  description:
    "Learn about InstaDL — a free, fast, and privacy-respecting Instagram media downloader for Reels, Videos, Photos, and Highlights.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Speed First",
    description: "We obsess over performance. Every millisecond matters when you want to save content quickly.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Privacy Respected",
    description: "We don't store your URLs, track your downloads, or ask for any personal information.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Always Free",
    description: "InstaDL has been and always will be completely free for personal use.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "User-Focused",
    description: "We build features users actually need, not features that sound impressive on a pitch deck.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">About</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
            We Make Saving Instagram Content Simple
          </h1>
          <p className="text-[#9090a8] text-lg leading-relaxed">
            InstaDL was built for content creators, marketers, and everyday users who want a
            fast, clean way to save public Instagram media — without signing up for anything.
          </p>
        </div>

        {/* Mission */}
        <div className="p-8 rounded-2xl bg-[#111118] border border-white/5 mb-12">
          <h2 className="font-display font-semibold text-white text-2xl mb-4">Our Mission</h2>
          <p className="text-[#9090a8] leading-relaxed">
            The internet should be simple. Downloading a video you want to save offline shouldn't
            require creating an account, installing an app, or sitting through ads. InstaDL exists
            to give you a no-nonsense tool that just works — every time.
          </p>
        </div>

        {/* Values */}
        <h2 className="font-display font-semibold text-white text-2xl mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {VALUES.map((v) => (
            <div key={v.title} className="p-6 rounded-2xl bg-[#111118] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#f72585]/10 flex items-center justify-center text-[#f72585] mb-4">
                {v.icon}
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-[#9090a8] text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <h2 className="font-display font-semibold text-amber-400 mb-3">Important Disclaimer</h2>
          <p className="text-[#9090a8] text-sm leading-relaxed">
            InstaDL is not affiliated with, endorsed by, or connected to Instagram or Meta
            Platforms, Inc. This tool is intended for downloading public content for personal use
            only. Always respect the intellectual property rights of content creators. Do not use
            downloaded content for commercial purposes without the creator's permission.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}

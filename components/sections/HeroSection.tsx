"use client";

import { DownloaderWidget } from "@/components/downloader/DownloaderWidget";
import { Shield, Zap, Lock } from "lucide-react";

/*
  ✅ SEO NOTES — HeroSection
  - H1 contains EXACT primary keyword: "Instagram Downloader"
  - H1 is the FIRST heading tag on the page (critical for Googlebot)
  - Secondary keywords in <p>: "download reels", "no watermark", "free"
  - Trust badges add E-E-A-T signals above the fold
  - Stats (10M+, 4.9★) act as social proof = Authority signal
  - aria-label on section for accessibility (also read by Googlebot)
  - No lazy-loading on hero content — must be in initial paint
*/

const TRUST_BADGES = [
  { icon: <Zap className="w-3.5 h-3.5" />, label: "Lightning Fast" },
  { icon: <Shield className="w-3.5 h-3.5" />, label: "100% Free" },
  { icon: <Lock className="w-3.5 h-3.5" />, label: "No Login Required" },
];

const STATS = [
  { value: "10M+", label: "Downloads Served", ariaLabel: "Over 10 million downloads served" },
  { value: "4.9★", label: "User Rating",      ariaLabel: "4.9 out of 5 star user rating" },
  { value: "100%", label: "Free Forever",     ariaLabel: "100 percent free forever" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
      id="downloader"
      aria-label="Instagram Downloader tool — paste any public Instagram URL to download"
    >
      {/* ── Background ──────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#0a0a0f]" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, #f72585 0%, #9b5de5 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 animate-float"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, #f72585, transparent)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 animate-float-delay"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, #00bbf9, transparent)", filter: "blur(40px)" }}
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#9090a8] mb-8"
          aria-label="InstaDL is free, requires no account, and adds no watermarks"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Free · No account needed · No watermark
        </div>

        {/*
          ✅ CRITICAL H1:
          - Contains exact-match primary keyword "Instagram Downloader"
          - Only ONE h1 on the entire page
          - Google reads the first ~100 words of rendered HTML most heavily
          - Secondary keyword "Free HD No Login" included naturally
        */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6">
          Instagram{" "}
          <span className="text-gradient">Downloader</span>
          {" "}— Free,{" "}
          <br className="hidden sm:block" />
          HD &amp; No Login
        </h1>

        {/*
          ✅ DESCRIPTION PARAGRAPH:
          - Secondary keywords: "save reels", "download videos", "photos", "carousels"
          - Naturally integrates "no account required" + "no watermark" + "free"
          - Readable for users + crawlable for Googlebot
        */}
        <p className="text-[#9090a8] text-lg sm:text-xl max-w-2xl leading-relaxed mb-4">
          The fastest way to save Instagram Reels, Videos, Photos, Carousels, and
          Highlights from any public profile. Download in full HD — free, instant,
          and with no account required.
        </p>

        {/* ✅ Supporting keyword line — targets "no watermark", "iPhone", "Android", "PC" */}
        <p className="text-[#55555f] text-sm mb-12">
          Works on iPhone, Android, Mac &amp; Windows PC · No watermark · No app install needed
        </p>

        {/* ✅ Downloader widget — the primary conversion element; must load above fold */}
        <div className="w-full max-w-2xl" id="tool">
          <DownloaderWidget />
        </div>

        {/* ✅ Trust badges — E-E-A-T Trustworthiness signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="Key features">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#9090a8] text-sm"
            >
              <span className="text-[#f72585]" aria-hidden="true">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>

        {/* ✅ Social proof stats — E-E-A-T Authority signals */}
        <div
          className="mt-12 grid grid-cols-3 gap-8 sm:gap-16"
          aria-label="InstaDL usage statistics"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-bold text-2xl sm:text-3xl text-white"
                aria-label={stat.ariaLabel}
              >
                {stat.value}
              </p>
              <p className="text-[#55555f] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
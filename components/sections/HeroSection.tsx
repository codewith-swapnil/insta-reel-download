"use client";

import { DownloaderWidget } from "@/components/downloader/DownloaderWidget";
import { Shield, Zap, Lock } from "lucide-react";

const TRUST_BADGES = [
  { icon: <Zap className="w-3.5 h-3.5" />, label: "Lightning Fast" },
  { icon: <Shield className="w-3.5 h-3.5" />, label: "100% Free" },
  { icon: <Lock className="w-3.5 h-3.5" />, label: "No Login Required" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #f72585 0%, #9b5de5 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 animate-float"
        style={{ background: "radial-gradient(circle, #f72585, transparent)", filter: "blur(40px)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 animate-float-delay"
        style={{ background: "radial-gradient(circle, #00bbf9, transparent)", filter: "blur(40px)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#9090a8] mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Free • No account needed • No watermark
        </div>

        {/* Heading */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6">
          Download Instagram{" "}
          <span className="text-gradient">Media</span>{" "}
          <br className="hidden sm:block" />
          Instantly
        </h1>

        <p className="text-[#9090a8] text-lg sm:text-xl max-w-2xl leading-relaxed mb-12">
          Save Reels, Videos, Photos, Carousels, and Highlights from any public
          Instagram profile. Fast, free, and no account required.
        </p>

        {/* Downloader widget */}
        <div className="w-full max-w-2xl">
          <DownloaderWidget />
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#9090a8] text-sm"
            >
              <span className="text-[#f72585]">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 sm:gap-16">
          {[
            { value: "10M+", label: "Downloads" },
            { value: "4.9★", label: "Rating" },
            { value: "100%", label: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-2xl sm:text-3xl text-white">{stat.value}</p>
              <p className="text-[#55555f] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

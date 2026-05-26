import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f72585]/10 via-[#9b5de5]/10 to-[#00bbf9]/10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
          Ready to Download?
        </h2>
        <p className="text-[#9090a8] text-lg mb-10 max-w-lg mx-auto">
          Join over 10 million users who trust InstaDL to save their favorite Instagram content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#downloader"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white font-display font-semibold text-base shadow-2xl hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            Start Downloading Free
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-display font-semibold text-base hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

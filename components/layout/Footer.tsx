import Link from "next/link";
import { Download, Heart } from "lucide-react";

const FOOTER_LINKS = {
  Tools: [
    { href: "/instagram-reels-downloader", label: "Reels Downloader" },
    { href: "/instagram-video-downloader", label: "Video Downloader" },
    { href: "/instagram-photo-downloader", label: "Photo Downloader" },
    { href: "/instagram-highlight-downloader", label: "Highlight Downloader" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f72585] to-[#9b5de5] flex items-center justify-center">
                <Download className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-semibold text-lg text-white">
                Insta<span className="text-gradient">DL</span>
              </span>
            </Link>
            <p className="text-[#9090a8] text-sm leading-relaxed max-w-sm">
              The fastest and most reliable free Instagram downloader. Save Reels,
              Videos, Photos, Carousels, and Highlights with one click.
            </p>
            <p className="mt-4 text-xs text-[#55555f]">
              InstaSaverHub is not affiliated with Instagram or Meta Platforms, Inc.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-white text-sm mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#9090a8] hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#55555f] text-xs">
            © {year} InstaSaverHub. All rights reserved.
          </p>
          <p className="text-[#55555f] text-xs flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-[#f72585]" fill="currentColor" /> for content creators
          </p>
        </div>
      </div>
    </footer>
  );
}

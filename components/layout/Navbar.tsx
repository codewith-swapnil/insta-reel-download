"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/instagram-reels-downloader", label: "Reels" },
  { href: "/instagram-video-downloader", label: "Videos" },
  { href: "/instagram-photo-downloader", label: "Photos" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#f72585] to-[#9b5de5] flex items-center justify-center shadow-lg group-hover:shadow-pink-500/40 transition-shadow">
            <Download className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-semibold text-lg text-white">
            Insta<span className="text-gradient">DL</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#9090a8] hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/#downloader"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white text-sm font-semibold shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download Free
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-[#9090a8] hover:text-white hover:bg-white/5 transition-all"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#111118]/95 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#9090a8] hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#downloader"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              Download Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

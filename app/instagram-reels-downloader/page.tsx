import type { Metadata } from "next";
import { DownloaderPage } from "@/components/ui/DownloaderPage";

export const metadata: Metadata = {
  title: "Instagram Reels Downloader — Save Reels in HD Free",
  description:
    "Download Instagram Reels for free in HD quality. No watermark, no login, no app needed. The fastest Instagram Reels downloader online.",
  keywords: ["instagram reels downloader", "download instagram reels", "save reels", "reels downloader free"],
  alternates: { canonical: "/instagram-reels-downloader" },
  openGraph: {
    title: "Instagram Reels Downloader — Free HD Download",
    description: "Download any public Instagram Reel in HD. No login, no watermark.",
    url: "https://instadl.pro/instagram-reels-downloader",
  },
};

const SEO_CONTENT = (
  <>
    <h2 className="font-display font-bold text-white text-2xl">How to Download Instagram Reels</h2>
    <p>
      Instagram Reels are short-form videos that often go viral. InstaDL lets you save any public
      Reel directly to your device in the original HD quality — no watermark, no registration.
    </p>
    <p>
      Simply open Instagram, find the Reel, tap the three-dot menu (⋯), select "Copy Link," then
      paste the URL into InstaDL above. The Reel will be fetched and ready to download in seconds.
    </p>
    <h3 className="font-display font-semibold text-white text-xl">Why Use InstaDL for Reels?</h3>
    <ul className="list-none space-y-2">
      {[
        "Downloads in original 1080p HD resolution",
        "No Instagram login or account required",
        "No annoying watermarks on saved content",
        "Works on iPhone, Android, Mac, Windows",
        "Completely free — no subscription needed",
      ].map((point) => (
        <li key={point} className="flex items-start gap-2">
          <span className="text-[#f72585] mt-0.5">✓</span>
          {point}
        </li>
      ))}
    </ul>
    <h3 className="font-display font-semibold text-white text-xl">Supported Reel Formats</h3>
    <p>
      InstaDL downloads Reels as MP4 files, which play on all devices and media players.
      You can share them, re-upload for personal use, or keep them as offline memories.
    </p>
  </>
);

export default function ReelsDownloaderPage() {
  return (
    <DownloaderPage
      badge="Instagram Reels Downloader"
      title="Download Instagram"
      titleHighlight="Reels Free"
      subtitle="Save any public Instagram Reel in HD quality. No watermarks, no login. The fastest Reels downloader online."
      color="from-[#f72585] to-[#c9184a]"
      features={["HD 1080p Quality", "No Watermark", "No Login", "MP4 Format", "Instant Download"]}
      seoContent={SEO_CONTENT}
    />
  );
}

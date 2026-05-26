import type { Metadata } from "next";
import { DownloaderPage } from "@/components/ui/DownloaderPage";

export const metadata: Metadata = {
  title: "Instagram Highlight Downloader — Save Highlights Free",
  description:
    "Download Instagram Highlights from public profiles for free. Save highlight stories in high quality. No login, no watermark.",
  keywords: ["instagram highlight downloader", "download instagram highlights", "save instagram highlights", "instagram story downloader"],
  alternates: { canonical: "/instagram-highlight-downloader" },
};

const SEO_CONTENT = (
  <>
    <h2 className="font-display font-bold text-white text-2xl">Download Instagram Highlights</h2>
    <p>
      Instagram Highlights are curated collections of stories that stay permanently on a profile.
      InstaDL allows you to save individual highlight items from any public Instagram profile.
    </p>
    <h3 className="font-display font-semibold text-white text-xl">How to Get the Highlight URL</h3>
    <ul className="list-none space-y-2">
      {[
        "Open Instagram and visit a public profile",
        "Tap on any Highlight circle below the bio",
        "In a browser: copy the URL from the address bar",
        "In the app: tap the three dots → Share → Copy link",
        "Paste into InstaDL and hit Download",
      ].map((step, i) => (
        <li key={step} className="flex items-start gap-2">
          <span className="text-[#ffbe0b] font-mono mt-0.5">{i + 1}.</span>
          {step}
        </li>
      ))}
    </ul>
    <p className="mt-4">
      Note: Only public Instagram highlights can be downloaded. Private account highlights
      require account authentication which InstaDL does not collect.
    </p>
  </>
);

export default function HighlightDownloaderPage() {
  return (
    <DownloaderPage
      badge="Instagram Highlight Downloader"
      title="Download Instagram"
      titleHighlight="Highlights Free"
      subtitle="Save Instagram Highlights from any public profile. Download individual highlight stories without any login."
      color="from-[#ffbe0b] to-[#f77f00]"
      features={["Public Profiles", "No Login Needed", "HD Quality", "No Watermark", "All Formats"]}
      seoContent={SEO_CONTENT}
    />
  );
}

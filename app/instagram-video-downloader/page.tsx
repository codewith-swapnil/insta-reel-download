import type { Metadata } from "next";
import { DownloaderPage } from "@/components/ui/DownloaderPage";

export const metadata: Metadata = {
  title: "Instagram Video Downloader — Download IGTV & Videos Free",
  description:
    "Download Instagram videos and IGTV in HD quality for free. No watermark, no login. Fast and reliable Instagram video downloader.",
  keywords: ["instagram video downloader", "download instagram videos", "igtv downloader", "save instagram video"],
  alternates: { canonical: "/instagram-video-downloader" },
};

const SEO_CONTENT = (
  <>
    <h2 className="font-display font-bold text-white text-2xl">Download Instagram Videos in HD</h2>
    <p>
      Instagram supports various video formats — from short clips in feed posts to long-form IGTV
      content. InstaDL supports downloading all types of public Instagram videos in the highest
      available resolution.
    </p>
    <h3 className="font-display font-semibold text-white text-xl">Supported Video Types</h3>
    <ul className="list-none space-y-2">
      {[
        "Instagram feed videos (standard posts)",
        "IGTV long-form videos",
        "Instagram Reels",
        "Sponsored/ad videos on public pages",
      ].map((point) => (
        <li key={point} className="flex items-start gap-2">
          <span className="text-[#9b5de5] mt-0.5">✓</span>
          {point}
        </li>
      ))}
    </ul>
    <h3 className="font-display font-semibold text-white text-xl">Download Steps</h3>
    <p>
      Copy the Instagram video URL from your browser or the app's share menu, paste it into
      InstaDL's input box, click Download, preview the video, and save it to your device. The
      whole process takes under 5 seconds.
    </p>
  </>
);

export default function VideoDownloaderPage() {
  return (
    <DownloaderPage
      badge="Instagram Video Downloader"
      title="Download Instagram"
      titleHighlight="Videos Free"
      subtitle="Save any public Instagram video or IGTV in HD quality. No watermarks, no login required."
      color="from-[#9b5de5] to-[#7b2d8b]"
      features={["HD & SD Quality", "IGTV Support", "No Watermark", "MP4 Format", "No Login"]}
      seoContent={SEO_CONTENT}
    />
  );
}

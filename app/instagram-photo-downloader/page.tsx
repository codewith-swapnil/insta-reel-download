import type { Metadata } from "next";
import { DownloaderPage } from "@/components/ui/DownloaderPage";

export const metadata: Metadata = {
  title: "Instagram Photo Downloader — Save Photos & Carousels Free",
  description:
    "Download Instagram photos and carousel posts in full resolution for free. No login, no watermark. Save any public Instagram image instantly.",
  keywords: ["instagram photo downloader", "download instagram photos", "save instagram pictures", "instagram carousel downloader"],
  alternates: { canonical: "/instagram-photo-downloader" },
};

const SEO_CONTENT = (
  <>
    <h2 className="font-display font-bold text-white text-2xl">Save Instagram Photos in Full Resolution</h2>
    <p>
      Instagram compresses photos when viewed in-app. InstaDL fetches photos directly from
      Instagram's CDN at the highest resolution stored — typically 1080×1080 for square posts
      and up to 1440px for portrait or landscape images.
    </p>
    <h3 className="font-display font-semibold text-white text-xl">Download Carousel Posts</h3>
    <p>
      Carousel posts can contain up to 10 photos or videos in a single post. InstaDL
      automatically detects carousels and lets you download each item individually or all at once
      with a single click. No need to screenshot each slide.
    </p>
    <h3 className="font-display font-semibold text-white text-xl">Supported Image Formats</h3>
    <p>
      Photos are downloaded as JPG files — the same format Instagram uses natively. This ensures
      maximum compatibility with all devices, image editors, and sharing platforms.
    </p>
  </>
);

export default function PhotoDownloaderPage() {
  return (
    <DownloaderPage
      badge="Instagram Photo Downloader"
      title="Download Instagram"
      titleHighlight="Photos Free"
      subtitle="Save Instagram photos and carousel posts in full resolution. No login, no watermark, no compression."
      color="from-[#00bbf9] to-[#0077b6]"
      features={["Full Resolution", "Carousel Support", "No Compression", "JPG Format", "Batch Download"]}
      seoContent={SEO_CONTENT}
    />
  );
}

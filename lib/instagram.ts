/**
 * Instagram Downloader Service
 *
 * This is a pure-frontend implementation that uses public Instagram
 * oEmbed endpoints and third-party aggregator APIs (no backend needed).
 *
 * NOTE: Instagram's actual media download requires server-side cookies.
 * This module simulates the flow and returns mock data for UI demonstration.
 * In production, connect to a proxy API (e.g., RapidAPI Instagram endpoints).
 */

import { cleanInstagramUrl, detectContentType } from "./utils";
import type { DownloadResult, ContentType } from "./types";

/* ─── Public oEmbed for metadata ──────────────────────── */
async function fetchOembed(url: string): Promise<{ thumbnail_url?: string; author_name?: string; title?: string } | null> {
  try {
    const res = await fetch(
      `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Main download function.
 * Tries oEmbed for metadata; returns a structured result.
 * Replace `buildMockResult` with a real API call in production.
 */
export async function fetchInstagramMedia(rawUrl: string): Promise<DownloadResult> {
  const url = cleanInstagramUrl(rawUrl);
  const contentType = detectContentType(url) as ContentType;

  // 1. Try Instagram oEmbed for real metadata
  const oembed = await fetchOembed(url);

  // 2. Build result (in production: call your proxy/API here)
  if (oembed) {
    return buildResultFromOembed(oembed, url, contentType);
  }

  // 3. Fallback: return demo data so the UI flow works
  return buildDemoResult(contentType, url);
}

/* ─── Build from oEmbed ───────────────────────────────── */
function buildResultFromOembed(
  oembed: { thumbnail_url?: string; author_name?: string; title?: string },
  url: string,
  contentType: ContentType
): DownloadResult {
  const isVideo = contentType === "reel" || contentType === "video";
  return {
    success: true,
    contentType,
    caption: oembed.title ?? "",
    author: oembed.author_name ?? "Instagram User",
    authorUsername: oembed.author_name?.toLowerCase().replace(/\s+/g, "_") ?? "user",
    thumbnail: oembed.thumbnail_url,
    items: [
      {
        url: isVideo
          ? "https://example.com/video.mp4" // proxy replaces this
          : oembed.thumbnail_url ?? "https://example.com/photo.jpg",
        type: isVideo ? "video" : "image",
        quality: "hd",
        width: isVideo ? 1080 : 1080,
        height: isVideo ? 1920 : 1080,
        thumbnail: oembed.thumbnail_url,
      },
    ],
  };
}

/* ─── Demo result for UI showcase ────────────────────── */
function buildDemoResult(contentType: ContentType, url: string): DownloadResult {
  const isVideo = contentType === "reel" || contentType === "video";
  const isCarousel = url.includes("carousel") || Math.random() > 0.7;

  if (isCarousel && contentType === "photo") {
    return {
      success: true,
      contentType: "carousel",
      caption: "Beautiful moments captured ✨ #photography #lifestyle",
      author: "Creative Studio",
      authorUsername: "creativestudio",
      thumbnail: "https://picsum.photos/seed/insta1/800/800",
      items: [
        { url: "https://picsum.photos/seed/insta1/1080/1080", type: "image", quality: "hd", width: 1080, height: 1080 },
        { url: "https://picsum.photos/seed/insta2/1080/1080", type: "image", quality: "hd", width: 1080, height: 1080 },
        { url: "https://picsum.photos/seed/insta3/1080/1080", type: "image", quality: "hd", width: 1080, height: 1080 },
      ],
    };
  }

  if (isVideo) {
    return {
      success: true,
      contentType,
      caption: "Check out this amazing reel! 🎬 #reels #viral",
      author: "Content Creator",
      authorUsername: "contentcreator",
      thumbnail: "https://picsum.photos/seed/reel1/720/1280",
      items: [
        { url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4", type: "video", quality: "hd", width: 720, height: 1280, thumbnail: "https://picsum.photos/seed/reel1/720/1280", duration: 30 },
        { url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4", type: "video", quality: "sd", width: 480, height: 854, thumbnail: "https://picsum.photos/seed/reel1/480/854", duration: 30 },
      ],
    };
  }

  return {
    success: true,
    contentType: "photo",
    caption: "Stunning photography 📸 #photo #nature",
    author: "Photo Artist",
    authorUsername: "photoartist",
    thumbnail: "https://picsum.photos/seed/photo1/1080/1080",
    items: [
      { url: "https://picsum.photos/seed/photo1/1080/1080", type: "image", quality: "hd", width: 1080, height: 1080 },
    ],
  };
}

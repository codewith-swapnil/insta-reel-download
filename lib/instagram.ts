import { cleanInstagramUrl, detectContentType } from "./utils";
import type { DownloadResult, ContentType, MediaItem } from "./types";

// ─── New API response shape ───────────────────────────────────────────────────

interface NewApiDataItem {
  thumbnail: string;
  type: "image" | "video";
  url: string;
}

interface NewApiInfo {
  caption?: string;
  is_video?: boolean;
  likes?: number;
  owner?: string;
  shortcode?: string;
  thumbnail?: string;
  timestamp?: string;
}

interface NewApiResponse {
  success: boolean;
  type: "carousel" | "video" | "image" | "reel" | "story";
  count: number;
  data: NewApiDataItem[];
  info: NewApiInfo;
}

// ─── Error helper ─────────────────────────────────────────────────────────────

function errorResult(message: string): DownloadResult {
  return { success: false, contentType: "unknown", items: [], error: message };
}

// ─── Map type string → ContentType ───────────────────────────────────────────

function mapContentType(t?: string): ContentType {
  switch (t) {
    case "carousel": return "carousel";
    case "reel":     return "reel";
    case "video":    return "video";
    case "image":    return "photo";
    case "story":    return "story";
    default:         return "unknown";
  }
}

// ─── Parse new API response ───────────────────────────────────────────────────

function parseNewApiResponse(data: NewApiResponse): DownloadResult {
  if (!data.success) return errorResult("API returned failure");
  if (!Array.isArray(data.data) || data.data.length === 0)
    return errorResult("No media found");

  const contentType = mapContentType(data.type);

  const items: MediaItem[] = data.data.map((m, i) => ({
    url: m.url,
    type: m.type,
    quality: i === 0 ? "hd" : "sd",
    thumbnail: m.thumbnail,
  }));

  return {
    success: true,
    contentType,
    caption: data.info?.caption ?? "",
    author: data.info?.owner ?? "Instagram User",
    authorUsername: data.info?.owner ?? "",
    thumbnail: data.info?.thumbnail ?? items[0]?.thumbnail,
    items,
  };
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchInstagramMedia(rawUrl: string): Promise<DownloadResult> {
  const url = cleanInstagramUrl(rawUrl);

  try {
    const res = await fetch("/api/instagram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) return errorResult(`Server error: ${res.status}`);

    const data: NewApiResponse = await res.json();
    return parseNewApiResponse(data);
  } catch (err) {
    return errorResult(err instanceof Error ? err.message : "Network error");
  }
}
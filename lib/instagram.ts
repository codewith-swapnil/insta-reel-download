import { cleanInstagramUrl, detectContentType } from "./utils";
import type { DownloadResult, ContentType, MediaItem } from "./types";

// ─── API response types (actual shape from the free API) ──────────────────────

interface ApiMediaItem {
  type: "image" | "video";
  download_url: string;
  thumb?: string;
  width?: number;
  height?: number;
  duration?: number;
}

interface ApiResponse {
  error: boolean | string;
  hosting?: string;
  shortcode?: string;
  caption?: string;
  audio?: string | null;
  type?: "album" | "video" | "image" | "reel" | "story";
  username?: string;
  full_name?: string;
  medias?: ApiMediaItem[];
  // fallback fields some APIs also return
  download_url?: string;
  thumb?: string;
}

// ─── Error helper — always satisfies DownloadResult shape ────────────────────

function errorResult(message: string): DownloadResult {
  return {
    success: false,
    contentType: "unknown",
    items: [],
    error: message,
  };
}

// ─── Map API "type" → ContentType ────────────────────────────────────────────

function mapContentType(apiType?: string, fallback?: ContentType): ContentType {
  switch (apiType) {
    case "album":     return "carousel";
    case "reel":      return "reel";
    case "video":     return "video";
    case "image":     return "photo";
    case "story":     return "story";
    default:          return fallback ?? "unknown";
  }
}

// ─── Parse the actual API response ──────────────────────────────────────────

function parseApiResponse(data: ApiResponse, urlContentType: ContentType): DownloadResult {
  // API-level error
  if (data.error === true || typeof data.error === "string") {
    return errorResult(
      typeof data.error === "string" ? data.error : "API returned an error"
    );
  }

  const contentType = mapContentType(data.type, urlContentType);

  // ── Album / Carousel ──────────────────────────────────────────────────────
  if (data.type === "album" && Array.isArray(data.medias) && data.medias.length > 0) {
    const items: MediaItem[] = data.medias.map((m) => ({
      url: m.download_url,
      type: m.type,
      quality: "hd",
      width: m.width,
      height: m.height,
      thumbnail: m.thumb,
      duration: m.duration,
    }));

    return {
      success: true,
      contentType: "carousel",
      caption: data.caption ?? "",
      author: data.full_name ?? data.username ?? "Instagram User",
      authorUsername: data.username ?? "",
      thumbnail: items[0]?.thumbnail,
      items,
    };
  }

  // ── Single video / reel / story ───────────────────────────────────────────
  if (
    (data.type === "video" || data.type === "reel" || data.type === "story") &&
    Array.isArray(data.medias) &&
    data.medias.length > 0
  ) {
    const items: MediaItem[] = data.medias.map((m, i) => ({
      url: m.download_url,
      type: m.type,
      quality: i === 0 ? "hd" : "sd",
      width: m.width,
      height: m.height,
      thumbnail: m.thumb,
      duration: m.duration,
    }));

    return {
      success: true,
      contentType,
      caption: data.caption ?? "",
      author: data.full_name ?? data.username ?? "Instagram User",
      authorUsername: data.username ?? "",
      thumbnail: items[0]?.thumbnail,
      items,
    };
  }

  // ── Single image ──────────────────────────────────────────────────────────
  if (data.type === "image" && Array.isArray(data.medias) && data.medias.length > 0) {
    const m = data.medias[0];
    return {
      success: true,
      contentType: "photo",
      caption: data.caption ?? "",
      author: data.full_name ?? data.username ?? "Instagram User",
      authorUsername: data.username ?? "",
      thumbnail: m.thumb,
      items: [
        {
          url: m.download_url,
          type: "image",
          quality: "hd",
          width: m.width,
          height: m.height,
          thumbnail: m.thumb,
        },
      ],
    };
  }

  // ── Flat fallback (some APIs return download_url at root) ─────────────────
  if (data.download_url) {
    return {
      success: true,
      contentType,
      caption: data.caption ?? "",
      author: data.full_name ?? data.username ?? "Instagram User",
      authorUsername: data.username ?? "",
      thumbnail: data.thumb,
      items: [
        {
          url: data.download_url,
          type: contentType === "reel" || contentType === "video" ? "video" : "image",
          quality: "hd",
          thumbnail: data.thumb,
        },
      ],
    };
  }

  return errorResult("No downloadable media found in API response");
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function fetchInstagramMedia(rawUrl: string): Promise<DownloadResult> {
  const url = cleanInstagramUrl(rawUrl);
  const contentType = detectContentType(url) as ContentType;

  try {
    const res = await fetch("/api/instagram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      return errorResult(`Server error: ${res.status}`);
    }

    const data: ApiResponse = await res.json();
    return parseApiResponse(data, contentType);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return errorResult(message);
  }
}
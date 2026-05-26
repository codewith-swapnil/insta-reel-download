import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Validate if a string is a valid Instagram URL */
export function isValidInstagramUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.hostname === "www.instagram.com" ||
        parsed.hostname === "instagram.com") &&
      (parsed.pathname.includes("/p/") ||
        parsed.pathname.includes("/reel/") ||
        parsed.pathname.includes("/tv/") ||
        parsed.pathname.includes("/stories/") ||
        parsed.pathname.includes("/highlights/"))
    );
  } catch {
    return false;
  }
}

/** Detect the type of Instagram content from URL */
export function detectContentType(
  url: string
): "reel" | "photo" | "video" | "carousel" | "highlight" | "story" | "unknown" {
  if (!url) return "unknown";
  if (url.includes("/reel/")) return "reel";
  if (url.includes("/tv/")) return "video";
  if (url.includes("/highlights/")) return "highlight";
  if (url.includes("/stories/")) return "story";
  if (url.includes("/p/")) return "photo"; // could be photo or carousel
  return "unknown";
}

/** Format a file size in bytes to human-readable */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Clean an Instagram URL by removing tracking params */
export function cleanInstagramUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Keep only the path, strip query params / fragments
    return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
  } catch {
    return url;
  }
}

/** Truncate a string to a max length */
export function truncate(str: string, max = 60): string {
  return str.length > max ? `${str.slice(0, max)}…` : str;
}

export type ContentType =
  | "reel"
  | "photo"
  | "video"
  | "carousel"
  | "highlight"
  | "story"
  | "unknown";

export type DownloadQuality = "hd" | "sd" | "thumb";

export interface MediaItem {
  url: string;
  type: "video" | "image";
  quality: DownloadQuality;
  width?: number;
  height?: number;
  thumbnail?: string;
  duration?: number; // seconds, for video
  size?: number; // bytes
}

export interface DownloadResult {
  success: boolean;
  contentType: ContentType;
  caption?: string;
  author?: string;
  authorUsername?: string;
  authorAvatar?: string;
  thumbnail?: string;
  items: MediaItem[];
  error?: string;
}

export type DownloadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: DownloadResult }
  | { status: "error"; message: string };

export interface FAQ {
  question: string;
  answer: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

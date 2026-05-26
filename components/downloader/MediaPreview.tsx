"use client";

import { useState } from "react";
import {
  Download,
  User,
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import type { DownloadResult, MediaItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MediaPreviewProps {
  result: DownloadResult;
}

const TYPE_LABELS: Record<string, string> = {
  reel: "🎬 Reel",
  video: "📹 Video",
  photo: "📷 Photo",
  carousel: "🖼️ Carousel",
  highlight: "✨ Highlight",
  story: "📱 Story",
  unknown: "📎 Media",
};

const QUALITY_LABELS: Record<string, string> = {
  hd: "HD 1080p",
  sd: "SD 720p",
  thumb: "Thumbnail",
};

function proxyUrl(url: string) {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}

export function MediaPreview({ result }: MediaPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [downloading, setDownloading] = useState<Record<number, boolean>>({});
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const activeItem = result.items[activeIndex];
  const isCarousel = result.items.length > 1;
  
  async function triggerDownload(item: MediaItem, index: number) {
    if (downloading[index]) return;
    setDownloading((prev) => ({ ...prev, [index]: true }));

    const ext = item.type === "video" ? "mp4" : "jpg";
    const filename = `insta-${Date.now()}.${ext}`;

    try {
      const res = await fetch(`/api/proxy-image?url=${encodeURIComponent(item.url)}`);
      if (!res.ok) throw new Error("Failed");

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading((prev) => ({ ...prev, [index]: false }));
    }
  }

  function downloadAll() {
    result.items.forEach((item, i) => triggerDownload(item, i));
  }

  const anyDownloading = Object.values(downloading).some(Boolean);

  return (
    <div className="rounded-2xl bg-[#111118] border border-white/8 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f72585] to-[#9b5de5] flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {result.author ?? "Instagram User"}
            </p>
            {result.authorUsername && (
              <p className="text-xs text-[#9090a8]">@{result.authorUsername}</p>
            )}
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#9090a8] font-medium shrink-0">
          {TYPE_LABELS[result.contentType] ?? "📎 Media"}
        </span>
      </div>

      {/* ── Media preview ───────────────────────────────────── */}
      <div className="relative bg-[#0a0a0f] aspect-square sm:aspect-video overflow-hidden">
        {activeItem.type === "video" ? (
          <video
            key={activeItem.url}
            src={activeItem.url}
            poster={activeItem.thumbnail ? proxyUrl(activeItem.thumbnail) : undefined}
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        ) : imgError[activeIndex] ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#55555f]">
            <ImageIcon className="w-10 h-10" />
            <p className="text-xs">Preview unavailable</p>
            <p className="text-xs opacity-60">Download करा पाहण्यासाठी</p>
          </div>
        ) : (
          <img
            key={activeItem.url}
            src={proxyUrl(activeItem.url)}
            alt={result.caption ?? "Instagram media"}
            className="w-full h-full object-contain"
            onError={() =>
              setImgError((prev) => ({ ...prev, [activeIndex]: true }))
            }
          />
        )}

        {/* Carousel arrows */}
        {isCarousel && (
          <>
            <button
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/80 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setActiveIndex((i) => Math.min(result.items.length - 1, i + 1))
              }
              disabled={activeIndex === result.items.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/80 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {result.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeIndex ? "bg-white w-4" : "bg-white/40 w-1.5"
                  )}
                  aria-label={`View item ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Caption ─────────────────────────────────────────── */}
      {result.caption && (
        <div className="px-4 py-3 border-b border-white/5">
          <p className="text-sm text-[#9090a8] leading-relaxed line-clamp-2">
            {result.caption}
          </p>
        </div>
      )}

      {/* ── Download buttons ────────────────────────────────── */}
      <div className="p-4 space-y-2">
        {isCarousel ? (
          <>
            <p className="text-xs text-[#55555f] mb-3">
              {result.items.length} items · Carousel Post
            </p>

            <div className="grid grid-cols-2 gap-2">
              {result.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => triggerDownload(item, i)}
                  disabled={downloading[i]}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-50 disabled:cursor-wait disabled:scale-100"
                >
                  {downloading[i] ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                  ) : item.type === "video" ? (
                    <Video className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{downloading[i] ? "Saving…" : `Item ${i + 1}`}</span>
                  {!downloading[i] && (
                    <Download className="w-3 h-3 ml-auto text-[#f72585] shrink-0" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={downloadAll}
              disabled={anyDownloading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white text-sm font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-wait disabled:scale-100"
            >
              {anyDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {anyDownloading
                ? "Downloading…"
                : `Download All (${result.items.length})`}
            </button>
          </>
        ) : (
          result.items.map((item, i) => (
            <button
              key={i}
              onClick={() => triggerDownload(item, i)}
              disabled={downloading[i]}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait disabled:scale-100",
                i === 0
                  ? "bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white hover:opacity-90"
                  : "bg-white/5 text-white hover:bg-white/10"
              )}
            >
              {downloading[i] ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {downloading[i]
                ? "Downloading…"
                : `Download ${QUALITY_LABELS[item.quality] ?? "Media"}`}
              {item.width && !downloading[i] && (
                <span className="ml-auto text-xs opacity-60">
                  {item.width}×{item.height}
                </span>
              )}
            </button>
          ))
        )}

        <p className="text-center text-xs text-[#55555f] pt-1">
          Only download content you have permission to use.{" "}
          <a href="/terms" className="text-[#f72585] hover:underline">
            Terms apply.
          </a>
        </p>
      </div>
    </div>
  );
}
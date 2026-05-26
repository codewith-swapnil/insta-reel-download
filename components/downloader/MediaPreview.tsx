"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, User, Image as ImageIcon, Video, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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

export function MediaPreview({ result }: MediaPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = result.items[activeIndex];
  const isCarousel = result.items.length > 1;

  function triggerDownload(item: MediaItem) {
    const a = document.createElement("a");
    a.href = item.url;
    a.download = `instadl-${Date.now()}.${item.type === "video" ? "mp4" : "jpg"}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="rounded-2xl bg-[#111118] border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f72585] to-[#9b5de5] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{result.author ?? "Unknown"}</p>
            {result.authorUsername && (
              <p className="text-xs text-[#9090a8]">@{result.authorUsername}</p>
            )}
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[#9090a8] font-medium">
          {TYPE_LABELS[result.contentType]}
        </span>
      </div>

      {/* Media preview */}
      <div className="relative bg-[#0a0a0f] aspect-square sm:aspect-video overflow-hidden">
        {activeItem.type === "video" ? (
          <video
            src={activeItem.url}
            poster={activeItem.thumbnail}
            controls
            className="w-full h-full object-contain"
            playsInline
          />
        ) : (
          <Image
            src={activeItem.url}
            alt={result.caption ?? "Instagram media"}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
            unoptimized
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
              onClick={() => setActiveIndex((i) => Math.min(result.items.length - 1, i + 1))}
              disabled={activeIndex === result.items.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-black/80 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {result.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all",
                    i === activeIndex ? "bg-white w-4" : "bg-white/40"
                  )}
                  aria-label={`View item ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      {result.caption && (
        <div className="px-4 py-3 border-b border-white/5">
          <p className="text-sm text-[#9090a8] leading-relaxed line-clamp-2">{result.caption}</p>
        </div>
      )}

      {/* Download buttons */}
      <div className="p-4 space-y-2">
        {isCarousel ? (
          <>
            {/* Carousel: download all or individual */}
            <p className="text-xs text-[#55555f] mb-3">
              {result.items.length} items · Carousel Post
            </p>
            <div className="grid grid-cols-2 gap-2">
              {result.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => triggerDownload(item)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.99]"
                >
                  {item.type === "video" ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                  Item {i + 1}
                  <Download className="w-3 h-3 ml-auto text-[#f72585]" />
                </button>
              ))}
            </div>
            <button
              onClick={() => result.items.forEach((item) => triggerDownload(item))}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <Download className="w-4 h-4" />
              Download All ({result.items.length})
            </button>
          </>
        ) : (
          <>
            {result.items.map((item, i) => (
              <button
                key={i}
                onClick={() => triggerDownload(item)}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.99]",
                  i === 0
                    ? "bg-gradient-to-r from-[#f72585] to-[#9b5de5] text-white hover:opacity-90"
                    : "bg-white/5 text-white hover:bg-white/10"
                )}
              >
                <Download className="w-4 h-4" />
                Download {QUALITY_LABELS[item.quality]}
                {item.width && (
                  <span className="ml-auto text-xs opacity-60">
                    {item.width}×{item.height}
                  </span>
                )}
              </button>
            ))}
          </>
        )}

        {/* Legal note */}
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

"use client";

import { useState, useRef } from "react";
import {
  Download,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ClipboardPaste,
  X,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Instagram,
  Link,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { cn, isValidInstagramUrl } from "@/lib/utils";
import { fetchInstagramMedia } from "@/lib/instagram";
import type { DownloadState } from "@/lib/types";
import { MediaPreview } from "./MediaPreview";

export function DownloaderWidget() {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [state, setState] = useState<DownloadState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = url.trim() !== "" && isValidInstagramUrl(url);
  const hasUrl = url.trim() !== "";

  const fieldState = state.status === "error"
    ? "error"
    : isValid
      ? "valid"
      : focused
        ? "focused"
        : "idle";

  async function handleDownload() {
    if (!isValid) {
      setState({ status: "error", message: "Please paste a valid Instagram URL." });
      return;
    }
    setState({ status: "loading" });
    try {
      const result = await fetchInstagramMedia(url);
      if (result.success) {
        setState({ status: "success", result });
      } else {
        setState({ status: "error", message: result.error ?? "Could not fetch media. Please try again." });
      }
    } catch {
      setState({ status: "error", message: "Network error. Please check your connection." });
    }
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setState({ status: "idle" });
      setTimeout(() => inputRef.current?.focus(), 0);
    } catch {
      inputRef.current?.focus();
    }
  }

  function handleClear() {
    setUrl("");
    setState({ status: "idle" });
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && isValid) handleDownload();
  }

  return (
    <div className="w-full max-w-2xl mx-auto" id="downloader">

      {/* Label */}
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#9090a8] mb-2.5 px-1">
        Instagram URL
      </span>

      {/* Input field wrapper */}
      <div
        className={cn(
          "relative rounded-[18px] border-[1.5px] overflow-hidden transition-all duration-200",
          fieldState === "error" &&
          "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.10)]",
          fieldState === "valid" &&
          "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]",
          fieldState === "focused" &&
          "border-[#f72585] shadow-[0_0_0_4px_rgba(247,37,133,0.12),0_0_0_8px_rgba(155,93,229,0.06)]",
          fieldState === "idle" &&
          "border-white/[0.08]"
        )}
        style={{ background: "#18181f" }}
      >
        <div className="flex items-center min-h-[68px]">

          {/* Instagram icon zone */}
          <div
            className={cn(
              "flex items-center justify-center w-[60px] h-[68px] shrink-0 border-r transition-colors duration-200",
              isValid
                ? "border-emerald-500/20 bg-emerald-500/5"
                : state.status === "error"
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-white/[0.06] bg-[#f72585]/5"
            )}
          >
            {state.status === "loading" ? (
              <Loader2 className="w-[22px] h-[22px] text-[#f72585] animate-spin" />
            ) : state.status === "error" || (hasUrl && !isValid) ? (
              <AlertCircle className="w-[22px] h-[22px] text-red-400" />
            ) : isValid ? (
              <CheckCircle2 className="w-[22px] h-[22px] text-emerald-400" />
            ) : (
              <Instagram className="w-[22px] h-[22px] text-[#f72585]" />
            )}
          </div>

          {/* Text input */}
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setState({ status: "idle" });
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="instagram.com/reel/..."
            className="flex-1 bg-transparent text-[#f0f0f8] placeholder:text-[#55555f] text-[15px] font-medium tracking-[-0.01em] outline-none px-4 h-[68px] min-w-0"
            autoComplete="off"
            spellCheck={false}
            aria-label="Instagram URL input"
          />

          {/* Right action: clear or paste */}
          <div className="flex items-center pr-3 shrink-0">
            {hasUrl ? (
              <button
                onClick={handleClear}
                className="p-2 rounded-xl text-[#55555f] hover:text-white hover:bg-white/5 transition-all"
                aria-label="Clear URL"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-[#9090a8] hover:text-[#f72585] hover:bg-[#f72585]/10 border border-white/[0.08] hover:border-[#f72585]/30 transition-all"
                aria-label="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={cn(
            "h-[3px] transition-all duration-300 rounded-b-[16px]",
            isValid
              ? "w-full bg-gradient-to-r from-[#f72585] via-[#9b5de5] to-[#00bbf9]"
              : hasUrl && !isValid
                ? "w-2/5 bg-red-500"
                : "w-0 bg-transparent"
          )}
        />
      </div>

      {/* Meta row: hint + char count */}
      <div className="flex items-center justify-between mt-2.5 px-1 min-h-5">
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs",
            state.status === "error" || (hasUrl && !isValid)
              ? "text-red-400"
              : isValid
                ? "text-emerald-400"
                : "text-[#55555f]"
          )}
        >
          {state.status === "error" ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {state.message}
            </>
          ) : isValid ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              Valid Instagram URL
            </>
          ) : hasUrl ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Not a valid Instagram URL
            </>
          ) : (
            <>
              <Link className="w-3.5 h-3.5 shrink-0" />
              Paste any Instagram link
            </>
          )}
        </p>
        {hasUrl && (
          <span className="text-xs text-[#55555f] tabular-nums">
            {url.trim().length} chars
          </span>
        )}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={state.status === "loading" || !hasUrl}
        className={cn(
          "mt-4 w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold text-base transition-all duration-200",
          "h-[62px]",
          state.status === "loading" || !hasUrl
            ? "bg-white/5 text-[#55555f] cursor-not-allowed"
            : "text-white hover:opacity-90 hover:-translate-y-px active:translate-y-0 active:opacity-100"
        )}
        style={
          state.status !== "loading" && hasUrl
            ? {
              background:
                "linear-gradient(135deg, #f72585 0%, #9b5de5 50%, #00bbf9 100%)",
            }
            : undefined
        }
        aria-label="Download Instagram media"
      >
        {state.status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Fetching media…
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Download
          </>
        )}
      </button>

      {/* Supported types pills */}
      {state.status === "idle" && !hasUrl && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { icon: <Video className="w-3 h-3" />, label: "Reels" },
            { icon: <ImageIcon className="w-3 h-3" />, label: "Photos" },
            { icon: <Video className="w-3 h-3" />, label: "Videos" },
            { icon: <LayoutGrid className="w-3 h-3" />, label: "Carousels" },
            { icon: <Sparkles className="w-3 h-3" />, label: "Stories" },
            { icon: <ExternalLink className="w-3 h-3" />, label: "Highlights" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-[#55555f] text-xs font-medium"
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Result */}
      {state.status === "success" && (
        <div className="mt-6">
          <MediaPreview result={state.result} />
        </div>
      )}
    </div>
  );
}
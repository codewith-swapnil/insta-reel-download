"use client";

import { useState, useRef } from "react";
import {
  Download,
  Link2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ClipboardPaste,
  X,
  Image as ImageIcon,
  Video,
  ExternalLink,
} from "lucide-react";
import { cn, isValidInstagramUrl } from "@/lib/utils";
import { fetchInstagramMedia } from "@/lib/instagram";
import type { DownloadState } from "@/lib/types";
import { MediaPreview } from "./MediaPreview";

export function DownloaderWidget() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<DownloadState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = url.trim() !== "" && isValidInstagramUrl(url);
  const hasUrl = url.trim() !== "";

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
      {/* Input area */}
      <div
        className={cn(
          "relative rounded-2xl p-1.5 transition-all duration-300",
          state.status === "error"
            ? "bg-red-500/20 shadow-[0_0_0_1px_rgba(239,68,68,0.4)]"
            : isValid
            ? "bg-gradient-to-r from-[#f72585]/30 via-[#9b5de5]/30 to-[#00bbf9]/30 shadow-[0_0_0_1px_rgba(247,37,133,0.4)]"
            : "bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
        )}
      >
        <div className="flex items-center gap-3 bg-[#18181f] rounded-xl px-4 py-3">
          {/* Icon */}
          <div className="shrink-0">
            {state.status === "loading" ? (
              <Loader2 className="w-5 h-5 text-[#f72585] animate-spin" />
            ) : state.status === "error" ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Link2 className="w-5 h-5 text-[#55555f]" />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setState({ status: "idle" }); }}
            onKeyDown={handleKeyDown}
            placeholder="Paste Instagram URL here..."
            className="flex-1 bg-transparent text-white placeholder:text-[#55555f] text-sm font-body outline-none min-w-0"
            autoComplete="off"
            spellCheck={false}
            aria-label="Instagram URL input"
          />

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {hasUrl ? (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-[#55555f] hover:text-white hover:bg-white/5 transition-all"
                aria-label="Clear URL"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9090a8] hover:text-white hover:bg-white/5 transition-all"
                aria-label="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {state.status === "error" && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 px-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {state.message}
        </p>
      )}

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={state.status === "loading" || !hasUrl}
        className={cn(
          "mt-4 w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-display font-semibold text-base transition-all duration-300",
          state.status === "loading" || !hasUrl
            ? "bg-white/5 text-[#55555f] cursor-not-allowed"
            : "bg-gradient-to-r from-[#f72585] via-[#9b5de5] to-[#00bbf9] text-white shadow-xl hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.99]"
        )}
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

      {/* URL examples */}
      {state.status === "idle" && !hasUrl && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { icon: <Video className="w-3 h-3" />, label: "Reels" },
            { icon: <ImageIcon className="w-3 h-3" />, label: "Photos" },
            { icon: <Video className="w-3 h-3" />, label: "Videos" },
            { icon: <ImageIcon className="w-3 h-3" />, label: "Carousels" },
            { icon: <ExternalLink className="w-3 h-3" />, label: "Highlights" },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[#9090a8] text-xs"
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

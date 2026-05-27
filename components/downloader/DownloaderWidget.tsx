"use client";

import { useState, useRef, useEffect } from "react";
import {
  Download,
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
  Server,
  Globe,
} from "lucide-react";
import { cn, isValidInstagramUrl } from "@/lib/utils";
import { fetchInstagramMedia } from "@/lib/instagram";
import type { DownloadState } from "@/lib/types";
import { MediaPreview } from "./MediaPreview";

/* ─── Download Loader ───────────────────────────────────── */

type LoaderStage = {
  pct: number;
  title: string;
  sub: string;
  step: 0 | 1 | 2; // which step is currently "active" (0-indexed)
};

const LOADER_STAGES: LoaderStage[] = [
  { pct: 12, title: "Connecting…", sub: "Reaching Instagram servers", step: 0 },
  { pct: 35, title: "Validating URL…", sub: "Checking media availability", step: 0 },
  { pct: 58, title: "Fetching media…", sub: "Reading media info", step: 1 },
  { pct: 80, title: "Almost there…", sub: "Preparing your download", step: 2 },
  { pct: 95, title: "Finishing up…", sub: "Just a moment", step: 2 },
];

const STEP_DEFS = [
  { icon: Link, label: "URL validated" },
  { icon: Server, label: "Fetching media info" },
  { icon: Download, label: "Preparing download" },
];

function DownloadLoader() {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    if (stageIdx >= LOADER_STAGES.length - 1) return;
    const t = setTimeout(() => setStageIdx((i) => i + 1), 900);
    return () => clearTimeout(t);
  }, [stageIdx]);

  const stage = LOADER_STAGES[stageIdx];

  return (
    <div
      className={cn(
        "rounded-[20px] border-[1.5px] p-7 transition-all duration-700",
        "border-[#f72585]/25 bg-[#111118]"
      )}
      style={{
        animation: "loaderGlow 2.5s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes loaderGlow {
          0%,100% { box-shadow: 0 0 20px rgba(247,37,133,0.25), 0 0 60px rgba(247,37,133,0.08); }
          50%      { box-shadow: 0 0 40px rgba(155,93,229,0.40), 0 0 80px rgba(0,187,249,0.15); }
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseLogo {
          0%,100% { transform: scale(1);    opacity: 1;   }
          50%      { transform: scale(1.1); opacity: 0.75; }
        }
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0);  opacity: 0.4; }
          40%          { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes shimmerBar {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .loader-dot { animation: dotBounce 1.2s ease-in-out infinite; }
        .loader-dot:nth-child(2) { animation-delay: 0.15s; }
        .loader-dot:nth-child(3) { animation-delay: 0.30s; }
        .loader-shimmer-bar {
          background: linear-gradient(90deg, #f72585, #9b5de5, #00bbf9, #f72585);
          background-size: 200% 100%;
          animation: shimmerBar 1.5s linear infinite;
        }
      `}</style>

      {/* Spinning ring + icon */}
      <div className="relative w-[72px] h-[72px] mx-auto mb-5">
        {/* Track */}
        <div className="absolute inset-0 rounded-full border-[3px] border-white/[0.06]" />
        {/* Spinner */}
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent"
          style={{
            borderTopColor: "#f72585",
            borderRightColor: "#9b5de5",
            animation: "spinRing 1s linear infinite",
          }}
        />
        {/* Center icon */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "pulseLogo 2s ease-in-out infinite" }}
        >
          <Instagram className="w-7 h-7 text-[#f72585]" />
        </div>
      </div>

      {/* Title + sub */}
      <p
        key={stage.title}
        className="text-center text-[17px] font-semibold text-[#f0f0f8] tracking-tight mb-1"
        style={{ animation: "fadeUp 0.3s ease" }}
      >
        {stage.title}
      </p>
      <p
        key={stage.sub}
        className="text-center text-[13px] text-[#55555f] mb-6"
        style={{ animation: "fadeUp 0.3s ease" }}
      >
        {stage.sub}
      </p>

      {/* Step indicators */}
      <div className="flex flex-col gap-2.5 mb-6">
        {STEP_DEFS.map((def, i) => {
          const isDone = i < stage.step;
          const isActive = i === stage.step;
          const Icon = def.icon;
          return (
            <div
              key={def.label}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-500",
                isDone && "bg-emerald-500/[0.07] border-emerald-500/20",
                isActive && "bg-[#f72585]/[0.07] border-[#f72585]/20",
                !isDone && !isActive && "bg-white/[0.02] border-white/[0.04]"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                  isDone && "bg-emerald-500/15 text-emerald-400",
                  isActive && "bg-[#f72585]/15 text-[#f72585]",
                  !isDone && !isActive && "bg-white/[0.05] text-[#55555f]"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className={cn(
                  "text-[13px] font-medium flex-1",
                  isDone && "text-emerald-400",
                  isActive && "text-[#f0f0f8]",
                  !isDone && !isActive && "text-[#55555f]"
                )}
              >
                {def.label}
              </span>
              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isActive && (
                <span className="flex gap-[3px] shrink-0">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="loader-dot w-[4px] h-[4px] rounded-full bg-[#9090a8] inline-block"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[12px] text-[#55555f] mb-2">
          <span>Processing…</span>
          <span className="tabular-nums">{stage.pct}%</span>
        </div>
        <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full loader-shimmer-bar transition-all duration-700 ease-out"
            style={{ width: `${stage.pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Widget ───────────────────────────────────────── */

export function DownloaderWidget() {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [state, setState] = useState<DownloadState>({ status: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);

  const isValid = url.trim() !== "" && isValidInstagramUrl(url);
  const hasUrl = url.trim() !== "";

  const fieldState =
    state.status === "error" ? "error"
      : isValid ? "valid"
        : focused ? "focused"
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

      {/* Input field */}
      <div
        className={cn(
          "relative rounded-[18px] border-[1.5px] overflow-hidden transition-all duration-200",
          fieldState === "error" && "border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.10)]",
          fieldState === "valid" && "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]",
          fieldState === "focused" && "border-[#f72585] shadow-[0_0_0_4px_rgba(247,37,133,0.12),0_0_0_8px_rgba(155,93,229,0.06)]",
          fieldState === "idle" && "border-white/[0.08]"
        )}
        style={{ background: "#18181f" }}
      >
        <div className="flex items-center min-h-[68px]">
          {/* Icon zone */}
          <div
            className={cn(
              "flex items-center justify-center w-[60px] h-[68px] shrink-0 border-r transition-colors duration-200",
              isValid && "border-emerald-500/20 bg-emerald-500/5",
              state.status === "error" || (hasUrl && !isValid) ? "border-red-500/20 bg-red-500/5"
                : !isValid && "border-white/[0.06] bg-[#f72585]/5"
            )}
          >
            {state.status === "error" || (hasUrl && !isValid) ? (
              <AlertCircle className="w-[22px] h-[22px] text-red-400" />
            ) : isValid ? (
              <CheckCircle2 className="w-[22px] h-[22px] text-emerald-400" />
            ) : (
              <Instagram className="w-[22px] h-[22px] text-[#f72585]" />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setState({ status: "idle" }); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="instagram.com/reel/..."
            className="flex-1 bg-transparent text-[#f0f0f8] placeholder:text-[#55555f] text-[15px] font-medium tracking-[-0.01em] outline-none px-4 h-[68px] min-w-0"
            autoComplete="off"
            spellCheck={false}
            aria-label="Instagram URL input"
          />

          {/* Paste / Clear */}
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
            isValid ? "w-full bg-gradient-to-r from-[#f72585] via-[#9b5de5] to-[#00bbf9]"
              : hasUrl && !isValid ? "w-2/5 bg-red-500"
                : "w-0"
          )}
        />
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between mt-2.5 px-1 min-h-5">
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs",
            state.status === "error" || (hasUrl && !isValid) ? "text-red-400"
              : isValid ? "text-emerald-400"
                : "text-[#55555f]"
          )}
        >
          {state.status === "error" ? (
            <><AlertCircle className="w-3.5 h-3.5 shrink-0" />{state.message}</>
          ) : isValid ? (
            <><CheckCircle2 className="w-3.5 h-3.5 shrink-0" />Valid Instagram URL</>
          ) : hasUrl ? (
            <><AlertCircle className="w-3.5 h-3.5 shrink-0" />Not a valid Instagram URL</>
          ) : (
            <><Link className="w-3.5 h-3.5 shrink-0" />Paste any Instagram link</>
          )}
        </p>
        {hasUrl && (
          <span className="text-xs text-[#55555f] tabular-nums">{url.trim().length} chars</span>
        )}
      </div>

      {/* Download button — hidden while loading */}
      {state.status !== "loading" && (
        <button
          onClick={handleDownload}
          disabled={!hasUrl}
          className={cn(
            "mt-4 w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold text-base transition-all duration-200 h-[62px]",
            !hasUrl
              ? "bg-white/5 text-[#55555f] cursor-not-allowed"
              : "text-white hover:opacity-90 hover:-translate-y-px active:translate-y-0"
          )}
          style={
            hasUrl
              ? { background: "linear-gradient(135deg, #f72585 0%, #9b5de5 50%, #00bbf9 100%)" }
              : undefined
          }
          aria-label="Download Instagram media"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
      )}

      {/* ✨ Modern loader */}
      {state.status === "loading" && (
        <div className="mt-4">
          <DownloadLoader />
        </div>
      )}

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
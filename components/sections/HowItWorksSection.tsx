/*
  ✅ SEO NOTES — HowItWorksSection
  - Inline HowTo JSON-LD schema: each visible step maps 1:1 with schema step
  - h2 targets: "how to download instagram" secondary keyword
  - Step descriptions use long-tail keywords:
      "copy instagram reel link", "paste instagram url", "download instagram video hd"
  - section id="how-it-works" matches HowTo schema's url anchor
  - aria-label on steps for accessibility (also signals semantic meaning to crawlers)
  - No "client" directive — renders server-side for faster indexing
*/

const STEPS = [
  {
    step: "01",
    title: "Copy the Instagram URL",
    description:
      "Open Instagram and find the Reel, Video, Photo, Carousel, or Highlight you want to download. Tap the three-dot menu (⋯) on the post, then tap Share → Copy Link.",
    detail: 'Instagram app → Post → ⋯ → "Share" → "Copy Link"',
    color: "#f72585",
    keywords: "copy instagram reel link, copy instagram video url, instagram share link",
  },
  {
    step: "02",
    title: "Paste the URL into InstaDL",
    description:
      "Paste the copied Instagram URL into the input box at the top of this page and press the Download button. InstaDL instantly fetches the media directly from Instagram's servers.",
    detail: "Paste URL → Click Download → Media fetched in under 2 seconds",
    color: "#9b5de5",
    keywords: "paste instagram url, instagram downloader input, fetch instagram media",
  },
  {
    step: "03",
    title: "Download & Save to Your Device",
    description:
      "Preview the fetched media and click the download button to save it to your device in the highest available quality — up to 1080p HD for videos and full resolution for photos.",
    detail: "HD quality · No watermark · Full original resolution",
    color: "#00bbf9",
    keywords: "download instagram video hd, save instagram reel to phone, download without watermark",
  },
];

/* ✅ HowTo schema — steps must match visible step content exactly */
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Download Instagram Videos, Reels & Photos for Free",
  description:
    "Learn how to download any Instagram Reel, Video, Photo, or Carousel in HD quality for free using InstaDL — no login, no watermark, no app required.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "InstaDL Instagram Downloader",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Copy the Instagram URL",
      text: "Open Instagram, find the Reel, Video, or Photo you want to download. Tap the three-dot menu (⋯) on the post, then tap Share → Copy Link to copy the post URL.",
      url: "https://instadl.pro/#how-it-works",
      image: "https://instadl.pro/how-to-step-1.jpg",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Paste the URL into InstaDL",
      text: "Paste the copied Instagram URL into the input box at the top of the InstaDL page and press the Download button. The media will be fetched instantly.",
      url: "https://instadl.pro/#how-it-works",
      image: "https://instadl.pro/how-to-step-2.jpg",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download & Save to Your Device",
      text: "Preview the media and click the download button to save it to your device in HD quality — up to 1080p for videos and full resolution for photos. No watermark added.",
      url: "https://instadl.pro/#how-it-works",
      image: "https://instadl.pro/how-to-step-3.jpg",
    },
  ],
};

export function HowItWorksSection() {
  return (
    <section
      className="py-24 px-4 bg-[#0d0d14] relative overflow-hidden"
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      {/* ✅ HowTo structured data — inline, server-rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Decorative divider */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ✅ Section header — h2 targets "how to download instagram" query cluster */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            Simple 3-Step Process
          </p>
          <h2
            id="how-it-works-heading"
            className="font-display font-bold text-4xl sm:text-5xl text-white mb-4"
          >
            How to Download Instagram Videos &amp; Reels
          </h2>
          <p className="text-[#9090a8] text-lg max-w-xl mx-auto">
            Download any Instagram Reel, Video, or Photo in 3 simple steps — no
            account, no app, no hassle.
          </p>
        </div>

        {/* ✅ Step cards — match 1:1 with HowTo schema steps */}
        <ol
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative list-none"
          aria-label="Steps to download Instagram media"
        >
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#f72585]/30 via-[#9b5de5]/30 to-[#00bbf9]/30"
            aria-hidden="true"
          />

          {STEPS.map((s, i) => (
            <li
              key={s.step}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#111118] border border-white/5"
            >
              {/* Step number circle */}
              <div className="relative mb-6" aria-hidden="true">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border border-white/10"
                  style={{
                    background: `conic-gradient(from 0deg, ${s.color} 0%, transparent 100%)`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#111118] flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-gradient">
                      {s.step}
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ h3 step title — contains long-tail keyword */}
              <h3 className="font-display font-semibold text-white text-xl mb-3">
                {s.title}
              </h3>

              {/* ✅ Step description — keyword-rich, matches schema text */}
              <p className="text-[#9090a8] text-sm leading-relaxed mb-4">
                {s.description}
              </p>

              {/* Detail hint */}
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#55555f] font-mono">
                {s.detail}
              </div>
            </li>
          ))}
        </ol>

        {/* ✅ Supplementary text — helps Google understand topical relevance */}
        <p className="text-center text-[#55555f] text-sm mt-10 max-w-lg mx-auto">
          InstaDL works on all devices. Whether you want to download Instagram Reels on iPhone,
          save videos on Android, or download Instagram content on your PC — the process is
          identical and takes under 60 seconds.
        </p>
      </div>
    </section>
  );
}
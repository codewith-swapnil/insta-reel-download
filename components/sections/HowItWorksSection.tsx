export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Copy the URL",
      description:
        "Open Instagram and copy the link to any public Reel, Video, Photo, Carousel, or Highlight you want to download.",
      detail: "Tap the three dots (⋯) on any post → Share → Copy Link",
    },
    {
      step: "02",
      title: "Paste & Fetch",
      description:
        "Paste the copied URL into the input box on InstaDL and press the Download button.",
      detail: "We'll instantly fetch the media from Instagram's servers",
    },
    {
      step: "03",
      title: "Download & Enjoy",
      description:
        "Preview the media and click the download button to save it to your device in the highest quality.",
      detail: "HD quality • No watermark • Full resolution",
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#0d0d14] relative overflow-hidden" id="how-it-works">
      {/* Decorative line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#f72585] uppercase tracking-widest mb-3">
            Simple Process
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            How It Works
          </h2>
          <p className="text-[#9090a8] text-lg max-w-xl mx-auto">
            Download any Instagram media in 3 simple steps. No account, no app, no hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#f72585]/30 via-[#9b5de5]/30 to-[#00bbf9]/30" />

          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#111118] border border-white/5">
              {/* Step number */}
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border border-white/10"
                  style={{
                    background: `conic-gradient(from 0deg, ${
                      i === 0 ? "#f72585" : i === 1 ? "#9b5de5" : "#00bbf9"
                    } 0%, transparent 100%)`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#111118] flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-gradient">{s.step}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-display font-semibold text-white text-xl mb-3">{s.title}</h3>
              <p className="text-[#9090a8] text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="px-4 py-2 rounded-xl bg-white/3 border border-white/5 text-xs text-[#55555f] font-mono">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { DownloaderWidget } from "@/components/downloader/DownloaderWidget";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";

interface DownloaderPageProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  color: string; // tailwind gradient classes
  features: string[];
  seoContent: React.ReactNode;
}

export function DownloaderPage({
  badge,
  title,
  titleHighlight,
  subtitle,
  features,
  seoContent,
}: DownloaderPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, #f72585 0%, #9b5de5 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[#9090a8] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#f72585] animate-pulse" />
            {badge}
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
            {title}{" "}
            <span className="text-gradient">{titleHighlight}</span>
          </h1>

          <p className="text-[#9090a8] text-lg max-w-xl leading-relaxed mb-10">
            {subtitle}
          </p>

          <DownloaderWidget />

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {features.map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded-full bg-white/5 text-[#9090a8] text-xs border border-white/5"
              >
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 px-4 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto text-[#9090a8] text-sm leading-relaxed space-y-6">
          {seoContent}
        </div>
      </section>

      <FeaturesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

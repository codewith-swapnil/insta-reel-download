import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SupportedContentSection } from "@/components/sections/SupportedContentSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { SEOContentSection } from "@/components/sections/SEOContentSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "InstaDL — Free Instagram Reels, Video & Photo Downloader",
  description:
    "Download Instagram Reels, Videos, Photos, Carousels & Highlights for free. No login required. HD quality. No watermark. The #1 Instagram downloader.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupportedContentSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <SEOContentSection />
      <CTASection />
    </>
  );
}

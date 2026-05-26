import Link from "next/link";

export function SEOContentSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto prose-custom">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            The Best Free Instagram Downloader
          </h2>
        </div>

        <div className="space-y-6 text-[#9090a8] text-sm leading-relaxed">
          <p>
            <strong className="text-white">InstaDL</strong> is the fastest and most reliable
            free Instagram media downloader available online. Whether you want to save Instagram
            Reels, download Instagram videos, save photos, or grab entire carousel posts,
            InstaDL handles it all with a single URL paste — no registration, no app download,
            and absolutely no watermarks.
          </p>

          <h3 className="font-display font-semibold text-white text-xl !mt-8">
            How to Download Instagram Reels for Free
          </h3>
          <p>
            Downloading Instagram Reels is simple with InstaDL. Open Instagram, find the Reel
            you want to save, tap the three-dot menu, and copy the link. Paste it into the
            InstaDL input box and hit Download. Your Reel will be fetched in HD quality and
            ready to save to your device in seconds.
          </p>

          <h3 className="font-display font-semibold text-white text-xl !mt-8">
            Download Instagram Videos Without Quality Loss
          </h3>
          <p>
            Standard video downloaders often compress files and reduce quality. InstaDL fetches
            media directly from Instagram's CDN servers, ensuring you get the original file at
            the highest resolution available — up to 1080p HD for videos and full resolution
            for photos.
          </p>

          <h3 className="font-display font-semibold text-white text-xl !mt-8">
            Save Instagram Carousel Posts — All at Once
          </h3>
          <p>
            Carousel posts contain multiple photos or videos in a single post. InstaDL
            automatically detects carousel posts and lets you download all items at once or
            individually, saving you time and effort.
          </p>

          <h3 className="font-display font-semibold text-white text-xl !mt-8">
            Download Instagram Highlights (Public Profiles)
          </h3>
          <p>
            Public Instagram highlights can be downloaded with InstaDL. Simply copy the
            highlight URL and paste it into the downloader. InstaDL supports saving highlight
            stories from any public Instagram profile.
          </p>

          {/* Internal links for SEO */}
          <div className="mt-10 p-6 rounded-2xl bg-[#111118] border border-white/5">
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Explore Dedicated Downloaders
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/instagram-reels-downloader", label: "Instagram Reels Downloader" },
                { href: "/instagram-video-downloader", label: "Instagram Video Downloader" },
                { href: "/instagram-photo-downloader", label: "Instagram Photo Downloader" },
                { href: "/instagram-highlight-downloader", label: "Instagram Highlight Downloader" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#f72585] hover:text-[#ff5fa3] text-sm flex items-center gap-2 transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

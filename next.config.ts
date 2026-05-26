import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Instagram CDN — scontent-ber1-1.cdninstagram.com, scontent-lax3-1.cdninstagram.com, etc.
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        // Instagram static content
        protocol: "https",
        hostname: "**.instagram.com",
      },
      {
        // Facebook CDN (Instagram reels sometimes use this)
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;

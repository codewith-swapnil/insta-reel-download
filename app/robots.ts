import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://instasaverhub.vercel.app/sitemap.xml",
    host: "https://instasaverhub.vercel.app",
  };
}

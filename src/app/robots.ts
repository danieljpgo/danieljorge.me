import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: "https://danieljorge.me/sitemap.xml",
    host: "https://danieljorge.me",
  };
}

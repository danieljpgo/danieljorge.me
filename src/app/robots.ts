// import type { MetadataRoute } from "next";
// : MetadataRoute.Robots

export default function robots() {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: "https://danieljorge.me/sitemap.xml",
    host: "https://danieljorge.me",
  };
}

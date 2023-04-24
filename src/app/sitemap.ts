// import type { MetadataRoute } from "next";
// : MetadataRoute.Sitemap

import { allNotes } from "contentlayer/generated";

export default function sitemap() {
  const notes = allNotes.map((note) => ({
    url: `https://danieljorge.me/notes/${note.slug}`,
    lastModified: note.publishedAt.split("T")[0],
  }));

  const routes = [""].map((route) => ({
    url: `https://danieljorge.me${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...notes];
}

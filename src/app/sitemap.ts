import type { MetadataRoute } from "next";
import { allNotes, allDiagrams } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = allNotes.map((note) => ({
    url: `https://danieljorge.me/notes/${note.slug}`,
    lastModified: note.publishedAt.split("T")[0],
  }));

  const diagrams = allDiagrams.map((diagram) => ({
    url: `https://danieljorge.me/diagrams/${diagram.slug}`,
    lastModified: diagram.createdAt.split("T")[0],
  }));

  const routes = [""].map((route) => ({
    url: `https://danieljorge.me${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...notes, ...diagrams];
}

import type { MetadataRoute } from "next";
import { notes, diagrams } from "~/lib/contentlayer";

export default function sitemap(): MetadataRoute.Sitemap {
  const notesRoute = notes.map((note) => ({
    url: `https://danieljorge.me/notes/${note.slug}`,
    lastModified: note.publishedAt.split("T")[0],
  }));

  const diagramsRoute = diagrams.map((diagram) => ({
    url: `https://danieljorge.me/diagrams/${diagram.slug}`,
    lastModified: diagram.createdAt.split("T")[0],
  }));

  const routes = [""].map((route) => ({
    url: `https://danieljorge.me${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...notesRoute, ...diagramsRoute];
}

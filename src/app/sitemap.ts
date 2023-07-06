import type { MetadataRoute } from "next";
import { notes, diagrams, documents, configs } from "~/lib/contentlayer";

export default function sitemap(): MetadataRoute.Sitemap {
  const notesRoute = notes
    .filter((note) => note.status === "published")
    .map((note) => ({
      url: `https://danieljorge.me/notes/${note.slug}`,
      lastModified: note.publishedAt.split("T")[0],
    }));

  const diagramsRoute = diagrams.map((diagram) => ({
    url: `https://danieljorge.me/diagrams/${diagram.slug}`,
    lastModified: diagram.createdAt.split("T")[0],
  }));

  const configsRoute = configs.map((config) => ({
    url: `https://danieljorge.me/configs/${config.slug}`,
    lastModified: config.createdAt.split("T")[0],
  }));

  const topicsRoute = [
    ...new Set(documents.map((content) => content.topics).flat()),
  ].map((slug) => ({
    url: `https://danieljorge.me/topics/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/diagrams"].map((route) => ({
    url: `https://danieljorge.me${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...routes,
    ...notesRoute,
    ...diagramsRoute,
    ...configsRoute,
    ...topicsRoute,
  ];
}

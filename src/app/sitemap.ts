import type { MetadataRoute } from "next";
import {
  notes,
  diagrams,
  documents,
  configs,
  crafts,
} from "~/lib/contentlayer";

// @TODO use documents

export default function sitemap(): MetadataRoute.Sitemap {
  const notesRoute = notes.map((note) => ({
    url: `https://danieljorge.me/notes/${note.slug}`,
    lastModified: note.publishedAt.split("T")[0],
  }));

  const diagramsRoute = diagrams.map((diagram) => ({
    url: `https://danieljorge.me/diagrams/${diagram.slug}`,
    lastModified: diagram.createdAt.split("T")[0],
  }));

  const craftsRoute = crafts.map((craft) => ({
    url: `https://danieljorge.me/crafts/${craft.slug}`,
    lastModified: craft.createdAt.split("T")[0],
  }));

  const configsRoute = configs.map((config) => ({
    url: `https://danieljorge.me/configs/${config.slug}`,
    lastModified: config.createdAt.split("T")[0],
  }));

  const topicsRoute = [
    ...new Set(documents.flatMap((content) => content.topics)),
  ].map((slug) => ({
    url: `https://danieljorge.me/topics/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const routes = [
    "",
    "/notes",
    "/diagrams",
    "/crafts",
    "/configs",
    "/topics",
  ].map((route) => ({
    url: `https://danieljorge.me${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...routes,
    ...notesRoute,
    ...diagramsRoute,
    ...craftsRoute,
    ...configsRoute,
    ...topicsRoute,
  ];
}

import type { DocumentTypeNames } from "contentlayer/generated";

export const OG = {
  HOME: "home",
  INDEX: "index",
  CONTENT: "content",
  CONTENT_IMAGE: "content-image",
  CONTENT_AUTO_IMAGES: "content-auto-images",
} as const;

export const DOCUMENT_TYPE = {
  NOTES: "notes",
  CRAFTS: "crafts",
  CONFIGS: "configs",
  DIAGRAMS: "diagrams",
  WRITINGS: "writings",
} as const;

export const TOPICS = {
  UI: "ui",
  CSS: "css",
  WEB: "web",
  REACT: "react",
  PRODUCTIVITY: "productivity",
  DESIGN_SYSTEM: "desigs-system",
} as const;

export const messages = {
  [TOPICS.UI]: "UI",
  [TOPICS.CSS]: "CSS",
  [TOPICS.WEB]: "Web",
  [TOPICS.REACT]: "React",
  [TOPICS.PRODUCTIVITY]: "Productivity",
  [TOPICS.DESIGN_SYSTEM]: "Design System",
  [DOCUMENT_TYPE.NOTES]: {
    title: "Notes",
    description: "Loose, short-form thoughts, reflections, and ideas.",
  },
  [DOCUMENT_TYPE.CRAFTS]: {
    title: "Crafts",
    description: "Build, concepts, techniques and solutions",
  },
  [DOCUMENT_TYPE.CONFIGS]: {
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
  },
  [DOCUMENT_TYPE.DIAGRAMS]: {
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
  },
  [DOCUMENT_TYPE.WRITINGS]: {
    title: "Writings",
    description: "Crafted, long form thoughts and ideas.",
  },
} as const;

//@TODO more type safety?

export const documentTypeMap: Record<DocumentTypeNames, string> = {
  Notes: DOCUMENT_TYPE.NOTES,
  Crafts: DOCUMENT_TYPE.CRAFTS,
  Configs: DOCUMENT_TYPE.CONFIGS,
  Diagrams: DOCUMENT_TYPE.DIAGRAMS,
  Writings: DOCUMENT_TYPE.WRITINGS,
} as const;

export const documentOGMap: Record<
  DocumentTypeNames,
  (typeof OG)[keyof typeof OG]
> = {
  Notes: OG.CONTENT,
  Crafts: OG.CONTENT_IMAGE,
  Configs: OG.CONTENT,
  Diagrams: OG.CONTENT_AUTO_IMAGES,
  Writings: OG.CONTENT,
} as const;

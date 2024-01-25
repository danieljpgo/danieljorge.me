import type { DocumentTypeNames } from "contentlayer/generated";

export const OG = {
  HOME: "home",
  INDEX: "index",
  CONTENT: "content",
  CONTENT_IMAGE: "content-image",
  CONTENT_AUTO_IMAGES: "content-auto-images",
} as const;

export const TOPIC = {
  UI: "ui",
  CSS: "css",
  WEB: "web",
  REACT: "react",
  PRODUCTIVITY: "productivity",
  DESIGN_SYSTEM: "design-system",
} as const;

export const CATEGORY = {
  NOTES: "notes",
  CRAFTS: "crafts",
  CONFIGS: "configs",
  DIAGRAMS: "diagrams",
  WRITINGS: "writings",
} as const;

export const messages = {
  [TOPIC.UI]: "UI",
  [TOPIC.CSS]: "CSS",
  [TOPIC.WEB]: "Web",
  [TOPIC.REACT]: "React",
  [TOPIC.PRODUCTIVITY]: "Productivity",
  [TOPIC.DESIGN_SYSTEM]: "Design System",
  [CATEGORY.NOTES]: {
    title: "Notes",
    description: "Loose, short-form thoughts, reflections, and ideas.",
  },
  [CATEGORY.CRAFTS]: {
    title: "Crafts",
    description: "Build, concepts, techniques and solutions",
  },
  [CATEGORY.CONFIGS]: {
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
  },
  [CATEGORY.DIAGRAMS]: {
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
  },
  [CATEGORY.WRITINGS]: {
    title: "Writings",
    description: "Crafted, long form thoughts and ideas.",
  },
} as const;

//@TODO more type safety?

export const documentCategoryMap: Record<
  DocumentTypeNames,
  (typeof CATEGORY)[keyof typeof CATEGORY]
> = {
  Notes: CATEGORY.NOTES,
  Crafts: CATEGORY.CRAFTS,
  Configs: CATEGORY.CONFIGS,
  Diagrams: CATEGORY.DIAGRAMS,
  Writings: CATEGORY.WRITINGS,
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

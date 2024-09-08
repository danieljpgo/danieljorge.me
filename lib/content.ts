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

export const PAGE = {
  TOPICS: "topics",
  TOPICS_DETAILS: "topics-details",
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
  [PAGE.TOPICS]: {
    title: "Topics",
    description: "A comprehensive list of all published content topics.",
  },
  [PAGE.TOPICS_DETAILS]: "",
} as const;

//@TODO more type safety?

export const documentOGMap: Record<
  DocumentTypeNames,
  (typeof OG)[keyof typeof OG]
> = {
  notes: OG.CONTENT,
  crafts: OG.CONTENT_IMAGE,
  configs: OG.CONTENT,
  diagrams: OG.CONTENT_AUTO_IMAGES,
  writings: OG.CONTENT,
} as const;

export function validateOG(param?: string | null) {
  if (!param) return undefined;

  for (const a of Object.values(OG)) {
    if (a === param) return param;
  }
  return undefined;
}

export function validateCategory(param?: string | null) {
  if (!param) return undefined;

  for (const a of Object.values(CATEGORY)) {
    if (a === param) return param;
  }
  return undefined;
}

export function validateTopic(param?: string | null) {
  if (!param) return undefined;

  for (const a of Object.values(TOPIC)) {
    if (a === param) return param;
  }
  return undefined;
}

export function validatePage(param?: string | null) {
  if (!param) return undefined;

  for (const a of Object.values(PAGE)) {
    if (a === param) return param;
  }
  return undefined;
}

// @TODO: refactore from category to pages
// @TODO: check validate functions
// @TODO: fix warning from contentlayer

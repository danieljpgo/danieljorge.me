import type { DocumentTypeNames } from "contentlayer/generated";

export const topics = {
  web: "Web",
  css: "CSS",
  react: "React",
  ui: "UI",
  ["design-system"]: "Design System",
  productivity: "Productivity",
} as const;

export const CATEGORY = {
  HOME: "home",
  CONTENT: "content",
  CONTENT_IMAGE: "content-image",
  CONTENT_AUTO_IMAGES: "content-auto-images",
  LIST: "list",
} as const;

export const documentTypeMap = {
  Diagrams: "diagrams",
  Notes: "notes",
  Writings: "writings",
  Configs: "configs",
  Crafts: "crafts",
} as const satisfies Record<DocumentTypeNames, string>;

export const documentCategoryMap = {
  Diagrams: "content-auto-images",
  Notes: "content",
  Writings: "content",
  Configs: "content",
  Crafts: "content-image",
} as const satisfies Record<
  DocumentTypeNames,
  (typeof CATEGORY)[keyof typeof CATEGORY]
>;

export const messages = {
  diagrams: {
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
  },
  notes: {
    title: "Notes",
    description: "Loose, short-form thoughts, reflections, and ideas.",
  },
  writings: {
    title: "Writings",
    description: "Crafted, long form thoughts and ideas.",
  },
  configs: {
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
  },
  crafts: {
    title: "Crafts",
    description: "Build, concepts, techniques and solutions",
  },
} as const satisfies Record<
  (typeof documentTypeMap)[keyof typeof documentTypeMap],
  { title: keyof typeof documentTypeMap; description: string }
>;

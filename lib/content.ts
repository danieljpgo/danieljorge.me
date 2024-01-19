import type { DocumentTypeNames } from "contentlayer/generated";

export const topics = {
  web: "Web",
  css: "CSS",
  react: "React",
  ui: "UI",
  ["design-system"]: "Design System",
  productivity: "Productivity",
} as const;

export const messages = {
  Diagrams: {
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
  },
  Notes: {
    title: "Notes",
    description: "Loose, short-form thoughts, reflections, and ideas.",
  },
  Writings: {
    title: "Writings",
    description: "Crafted, long form thoughts and ideas.",
  },
  Configs: {
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
  },
  Crafts: {
    title: "Crafts",
    description: "Build, concepts, techniques and solutions",
  },
} as const satisfies Record<
  DocumentTypeNames,
  { title: string; description: string }
>;

export const OG = {
  TYPE: {
    HOME: 'home',
    CONTENT: 'content',
    CONTENT_IMAGE: 'content-image',
    LIST: 'list',
    DIAGRAM: 'diagram',
  }
}
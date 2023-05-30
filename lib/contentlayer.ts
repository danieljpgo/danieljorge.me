import {
  allNotes,
  allDiagrams,
  allConfigs,
  allCrafts,
  type Notes,
  type Diagrams,
  type Configs,
  type Crafts,
} from "contentlayer/generated";

type Heading = {
  level: number;
  content: string;
  slug: string;
};

export const notes: Array<
  Omit<Notes, "headings"> & { headings: Array<Heading> }
> = allNotes;

export const diagrams: Array<
  Omit<Diagrams, "headings"> & { headings: Array<Heading> }
> = [...allDiagrams].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

export const crafts: Array<
  Omit<Crafts, "headings"> & { headings: Array<Heading> }
> = allCrafts;

export const configs: Array<
  Omit<Configs, "headings"> & { headings: Array<Heading> }
> = allConfigs;

export const tags = {
  web: "Web",
  css: "CSS",
  react: "React",
};

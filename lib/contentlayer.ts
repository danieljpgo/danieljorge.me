import {
  type Notes,
  type Diagrams,
  type Configs,
  type Crafts,
  allNotes,
  allDiagrams,
  allConfigs,
  allCrafts,
} from "contentlayer/generated";

type Heading = {
  level: number;
  content: string;
  slug: string;
};

export const notes: Array<
  Omit<Notes, "headings"> & { headings: Array<Heading> }
> = [...allNotes].sort(
  (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
);

export const diagrams: Array<
  Omit<Diagrams, "headings"> & { headings: Array<Heading> }
> = [...allDiagrams].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

export const crafts: Array<
  Omit<Crafts, "headings"> & { headings: Array<Heading> }
> = [...allCrafts].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

export const configs: Array<
  Omit<Configs, "headings"> & { headings: Array<Heading> }
> = [...allConfigs].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

import {
  type Notes,
  type Diagrams,
  type Configs,
  allNotes,
  allDiagrams,
  allConfigs,
} from "contentlayer/generated";

export type Heading = {
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

export const configs: Array<
  Omit<Configs, "headings"> & { headings: Array<Heading> }
> = [...allConfigs].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

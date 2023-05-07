import {
  allNotes,
  allDiagrams,
  type Notes,
  type Diagrams,
} from "contentlayer/generated";

export type Heading = {
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

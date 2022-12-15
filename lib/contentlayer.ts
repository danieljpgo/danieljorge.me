import { allNotes, Notes } from "contentlayer/generated";

export type Heading = {
  level: number;
  content: string;
  slug: string;
};

export const notes: Array<
  Omit<Notes, "headings"> & { headings: Array<Heading> }
> = allNotes;

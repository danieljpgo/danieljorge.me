import {
  type Writings,
  type Notes,
  type Diagrams,
  type Configs,
  type Crafts,
  type DocumentTypes,
  allWritings,
  allNotes,
  allDiagrams,
  allConfigs,
  allCrafts,
  allDocuments,
} from "contentlayer/generated";

type Heading = {
  level: number;
  content: string;
  slug: string;
};

export const writings: Array<
  Omit<Writings, "headings"> & { headings: Array<Heading> }
> = [...allWritings]
  .filter((note) => note.status === "published")
  .sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

export const notes: Array<
  Omit<Notes, "headings"> & { headings: Array<Heading> }
> = [...allNotes]
  .filter((note) => note.status === "published")
  .sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

export const diagrams: Array<
  Omit<Diagrams, "headings"> & { headings: Array<Heading> }
> = [...allDiagrams].sort(
  (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
);

export const crafts: Array<
  Omit<Crafts, "headings"> & { headings: Array<Heading> }
> = [...allCrafts]
  .filter((craft) => craft.status === "published")
  .sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

export const configs: Array<
  Omit<Configs, "headings"> & { headings: Array<Heading> }
> = [...allConfigs]
  .filter((config) => config.status === "published")
  .sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

export const documents = [...allDocuments]
  .filter((document) => document.status === "published")
  .sort((a, b) => {
    if ("createdAt" in a && "createdAt" in b) {
      return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    }
    if (!("createdAt" in a) && "createdAt" in b) {
      return Number(new Date(b.createdAt)) - Number(new Date(a.publishedAt));
    }
    if (!("createdAt" in a) && !("createdAt" in b)) {
      return Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt));
    }
    if ("createdAt" in a && !("createdAt" in b)) {
      return Number(new Date(b.publishedAt)) - Number(new Date(a.createdAt));
    }
    return 0;
  });

export const routes = allDocuments.map(
  (document) => document._raw.sourceFileDir,
);

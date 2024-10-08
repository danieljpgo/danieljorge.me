import {
  type writings as Writings,
  type notes as Notes,
  type diagrams as Diagrams,
  type configs as Configs,
  type crafts as Crafts,
  allWritings,
  allNotes,
  allDiagrams,
  allConfigs,
  allCrafts,
  allDocuments,
} from "contentlayer/generated";
import { TOPIC } from "./content";

type Heading = {
  level: number;
  content: string;
  slug: string;
};

export const writings: Array<
  Omit<Writings, "headings"> & { headings: Array<Heading> }
> = [...allWritings]
  .filter((note) => note.status === "published")
  .map((doc) => ({ ...doc, category: doc.type }))
  .sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

export const notes: Array<
  Omit<Notes, "headings"> & { headings: Array<Heading> }
> = [...allNotes]
  .filter((note) => note.status === "published")
  .map((doc) => ({ ...doc, category: doc.type }))
  .sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

export const diagrams: Array<
  Omit<Diagrams, "headings"> & { headings: Array<Heading> }
> = [...allDiagrams]
  .map((doc) => ({ ...doc, category: doc.type }))
  .sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

export const crafts: Array<
  Omit<Crafts, "headings"> & { headings: Array<Heading> }
> = [...allCrafts]
  .filter((craft) => craft.status === "published")
  .map((doc) => ({ ...doc, category: doc.type }))
  .sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

export const configs: Array<
  Omit<Configs, "headings"> & { headings: Array<Heading> }
> = [...allConfigs]
  .filter((config) => config.status === "published")
  .map((doc) => ({ ...doc, category: doc.type }))
  .sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

export const documents = [...allDocuments]
  .filter((doc) => doc.status === "published")
  .map((doc) => ({ ...doc, category: doc.type }))
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

export const topics = documents
  .flatMap((document) => document.topics)
  .reduce(
    (a, t) => ({ ...a, [t]: a[t] ? a[t] + 1 : 1 }),
    {} as Record<(typeof TOPIC)[keyof typeof TOPIC], number>,
  );

// type a = Array<[(typeof TOPIC)[keyof typeof TOPIC], number]>;
// export const topicsss = documents.reduce(
//   (acc, curr) => {
//     curr.topics.forEach((topic) => {
//       acc[topic] = acc[topic] ? acc[topic] + 1 : 1;
//     });
//     return acc;
//   },
//   {} as Record<string, number>,
// );

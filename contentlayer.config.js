import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { rehype } from "./lib/rehype";
import { formatDate } from "./lib/date";
import { CATEGORY, TOPIC } from "./lib/content";

/** @type {import("contentlayer/source-files").FieldDef} */
const fields = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  status: {
    type: "enum",
    options: ["draft", "published"],
    required: true,
  },
  topics: {
    type: "list",
    of: {
      type: "enum",
      options: Object.values(TOPIC),
    },
    required: true,
  },
};

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (content) => content._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  headings: {
    type: "list",
    resolve: (doc) => {
      const slugger = new GithubSlugger();
      const regexHeadings = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      return Array.from(doc.body.raw.matchAll(regexHeadings)).map(
        ({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;
          return {
            level: flag?.length,
            content: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        },
      );
    },
  },
};

export const writings = defineDocumentType(() => ({
  name: `${CATEGORY.WRITINGS}`,
  contentType: "mdx",
  filePathPattern: `${CATEGORY.WRITINGS}/*.mdx`,
  fields: {
    ...fields,
    publishedAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => formatDate(doc.publishedAt),
    },
  },
}));

export const notes = defineDocumentType(() => ({
  name: `${CATEGORY.NOTES}`,
  contentType: "mdx",
  filePathPattern: `${CATEGORY.NOTES}/*.mdx`,
  fields: {
    ...fields,
    publishedAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    publishedAtFormatted: {
      type: "string",
      resolve: (doc) => formatDate(doc.publishedAt),
    },
  },
}));

export const diagrams = defineDocumentType(() => ({
  name: `${CATEGORY.DIAGRAMS}`,
  contentType: "mdx",
  filePathPattern: `${CATEGORY.DIAGRAMS}/*.mdx`,
  fields: {
    ...fields,
    createdAt: {
      type: "date",
      required: true,
    },
    images: {
      type: "list",
      required: true,
      of: { type: "string" },
    },
  },
  computedFields: {
    ...computedFields,
    createdAtFormatted: {
      type: "string",
      resolve: (doc) => formatDate(doc.createdAt),
    },
  },
}));

export const crafts = defineDocumentType(() => ({
  name: `${CATEGORY.CRAFTS}`,
  contentType: "mdx",
  filePathPattern: `${CATEGORY.CRAFTS}/*.mdx`,
  fields: {
    ...fields,
    createdAt: {
      type: "date",
      required: true,
    },
    og: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    ...computedFields,
    createdAtFormatted: {
      type: "string",
      resolve: (doc) => formatDate(doc.createdAt),
    },
  },
}));

export const configs = defineDocumentType(() => ({
  name: `${CATEGORY.CONFIGS}`,
  contentType: "mdx",
  filePathPattern: `${CATEGORY.CONFIGS}/*.mdx`,
  fields: {
    ...fields,
    createdAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: false,
    },
  },
  computedFields: {
    ...computedFields,
    createdAtFormatted: {
      type: "string",
      resolve: (doc) => formatDate(doc.createdAt),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [writings, notes, diagrams, crafts, configs],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehype.slug],
      [rehype.prettyCode, rehype.options.prettyCode],
      [rehype.autolinkHeadings, rehype.options.autolinkHeadings],
    ],
  },
});

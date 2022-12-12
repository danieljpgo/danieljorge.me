import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { rehype } from "./lib/rehype";

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  contentType: "mdx",
  filePathPattern: "writing/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: false,
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (writing) => writing._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export const Notes = defineDocumentType(() => ({
  name: "Notes",
  contentType: "mdx",
  filePathPattern: "notes/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: false,
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (notes) => notes._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Writing, Notes],
  mdx: {
    rehypePlugins: [
      [rehype.slug],
      [rehype.prettyCode, rehype.options.prettyCode],
      [rehype.autolinkHeadings, rehype.options.autolinkHeadings],
    ],
  },
});

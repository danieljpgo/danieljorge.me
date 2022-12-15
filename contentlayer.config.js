import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { rehype } from "./lib/rehype";
import { formatDate } from "./lib/date";
import GithubSlugger from "github-slugger";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (writing) => writing._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  publishedAtFormatted: {
    type: "string",
    resolve: (doc) => formatDate(doc.publishedAt),
  },
  headings: {
    type: "list",
    resolve: (doc) => {
      // rehype-slug algorithm packages
      const slugger = new GithubSlugger();
      const regexHeadings = /\n\n(?<flag>#{1,6})\s+(?<content>.+)/g;
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
    publishedAt: {
      type: "date",
      required: true,
    },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    // tags: {
    //   type: "list",
    //   of: Tag,
    // },
  },
  computedFields,
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
    publishedAt: {
      type: "date",
      required: true,
    },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    // tags: {
    //   type: "list",
    //   of: Tag,
    // },
  },
  computedFields,
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

// @TODO Voltar aqui e adicionar tags

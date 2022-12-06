import type { Options as AutolinkHeadingsOptions } from "rehype-autolink-headings";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { Options as SlugOptions } from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const autolinkHeadingsOptions: AutolinkHeadingsOptions = {
  behavior: "wrap",
};

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: "poimandres",
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
};

const slugOptions: SlugOptions = {};

export const rehype = {
  autolinkHeadings: rehypeAutolinkHeadings,
  prettyCode: rehypePrettyCode,
  slug: rehypeSlug,
  options: {
    autolinkHeadings: autolinkHeadingsOptions,
    prettyCode: prettyCodeOptions,
    slug: slugOptions,
  },
};

// @TODO Adicionar a hashtag
// properties: {
//   className: [
//     "before:content-['#'] before:text-gray-100/0 hover:before:text-gray-100/50",
//   ],
// },

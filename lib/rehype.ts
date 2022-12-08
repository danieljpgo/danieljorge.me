import type { Options as AutolinkHeadingsOptions } from "rehype-autolink-headings";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import type { Options as SlugOptions } from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const autolinkHeadingsOptions: AutolinkHeadingsOptions = {
  behavior: "wrap",
  properties: {
    className: [
      // @TODO fix here
      "before:content-['#'] before:absolute before:-ml-[1em] before:text-gray-100/0 hover:before:text-gray-900 pl-[1em] -ml-[1em] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
    ],
  },
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

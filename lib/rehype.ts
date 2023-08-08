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
      "-ml-[0.85em] pl-[0.85em] no-underline text-inherit font-semibold",
      "before:absolute before:-ml-[0.85em] before:text-gray-100/0 before:opacity-0 before:transition-opacity before:duration-200 before:content-['#']",
      "hover:before:text-gray-900 hover:before:opacity-100",
      "md:-ml-[1em] md:pl-[1em] md:before:-ml-[1em]",
    ],
  },
};

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: "poimandres",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
    if (!node.children.length) return;
    if (!node.children[0].children) return;

    const value = node.children[0].children[0].value;
    if (value.startsWith("-")) {
      node.properties.className.push("line--highlighted--remove");
      node.children[0].children = [
        { type: "text", value: value.replace("-", " ") },
      ];
    }
    if (value.startsWith("+")) {
      node.properties.className.push("line--highlighted--add");
      node.children[0].children = [
        { type: "text", value: value.replace("+", " ") },
      ];
    }
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word--highlighted"];
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

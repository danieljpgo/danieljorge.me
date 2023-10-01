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
  grid: true,
  onVisitHighlightedLine(node) {
    if (!node.children) return;
    if (node.children[0].type !== "element") return;
    if (node.children[0].children[0].type !== "text") return;

    const { value } = node.children[0].children[0];
    if (value.trimStart().startsWith("-/")) {
      node.properties["data-diff-remove"] = "";
      node.children[0].children[0].value = value.replace("-/", "");
    }
    if (value.trimStart().startsWith("+/")) {
      node.properties["data-diff-insert"] = "";
      node.children[0].children[0].value = value.replace("+/", "");
    }
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

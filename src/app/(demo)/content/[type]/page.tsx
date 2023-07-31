import type { Metadata } from "next";
import type { DocumentTypeNames } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { formatDateNumerical } from "~/lib/date";
import { documents, routes } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
// import Link from "next/link";
// import { cn } from "~/lib/tailwindcss";
// import { configs } from "~/lib/contentlayer";
// import { genericMetadata } from "~/lib/metadata";
// import { Heading, Text, Mdx, View } from "~/components";
// import { topics } from "~/lib/content";

type ContentProps = {
  params: { type: string };
};

export default function Content(props: ContentProps) {
  return <div>JSX</div>;
}

export function generateStaticParams(): Array<ContentProps["params"]> {
  return routes.map((path) => ({ type: path }));
}

export function generateMetadata({ params }: ContentProps): Metadata {
  const contents = documents.filter(
    (doc) => doc._raw.sourceFileDir === params.type,
  );
  if (!contents.length) notFound();

  const metadata = {
    title: metadatas[contents[0].type].title,
    description: metadatas[contents[0].type].description,
  };

  const og = new URLSearchParams({
    title: metadata.title,
    description: metadata.description,
    type: "list",
    items: contents
      .map(
        (content) =>
          `${formatDateNumerical(
            "createdAt" in content ? content.createdAt : content.publishedAt,
          )};${content.title}`,
      )
      .slice(0, 10)
      .join("|"),
  }).toString();

  return {
    title: metadata.title,
    description: metadata.description,
    twitter: {
      ...genericMetadata.twitter,
      title: metadata.title,
      description: metadata.description,
      images: {
        ...genericMetadata.twitter.images,
        url: `${baseURL}/api/og?${og}`,
        alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          ...genericMetadata.openGraph.images[0],
          url: `${baseURL}/api/og?${og}`,
          alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
        },
      ],
    },
  };
}

// @TODO improve here

const metadatas = {
  Configs: {
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
  },
  Crafts: {
    title: "Crafts",
    description:
      "Build, concepts, techniques, solutions and explaining in detail.",
  },
  Diagrams: {
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
  },
  Notes: {
    title: "Notes",
    description: "Loose, short-form thoughts, reflections, and ideas.",
  },
  Writings: {
    title: "Writings",
    description: "Crafted, long form thoughts and ideas.",
  },
} as const satisfies Record<
  DocumentTypeNames,
  { title: string; description: string }
>;

const baseURL = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

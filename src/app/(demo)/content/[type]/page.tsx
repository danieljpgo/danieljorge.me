import type { Metadata } from "next";
import type { DocumentTypeNames } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDateNumerical } from "~/lib/date";
import { documents, routes } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
import { cn } from "~/lib/tailwindcss";
import { Heading, Text, View } from "~/components";

type ContentProps = {
  params: { type: string };
};
export default function Content({ params }: ContentProps) {
  const contents = documents.filter(
    (doc) => doc._raw.sourceFileDir === params.type,
  );

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          "mt-[100px]",
        )}
      >
        <nav className="grid gap-1">
          <hr className="my-1.5" />
          <a
            href="#"
            className="text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
          >
            Back to top
          </a>
        </nav>
      </aside>
      <article className="grid w-full max-w-2xl gap-4">
        <div className="flex flex-col gap-2 pt-7">
          <Heading
            as="h1"
            size="2xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {/* Configs */}
            {metadatas[contents[0].type].title}
          </Heading>
          <Text color="base">{metadatas[contents[0].type].description}</Text>
        </div>
        <hr />
        <div className="grid gap-4">
          <ul className="grid gap-4">
            {contents.map((content) => (
              <li key={content.slug}>
                <article className="grid gap-1">
                  <Link href={content._raw.flattenedPath}>
                    <Heading
                      as="h2"
                      size="base"
                      weight="medium"
                      leading="tight"
                      color="darker"
                    >
                      {content.title}
                    </Heading>
                  </Link>
                  <div className="flex gap-2">
                    <Text size="sm" color="light">
                      {"createdAtFormatted" in content
                        ? content.createdAtFormatted
                        : content.publishedAtFormatted}
                    </Text>
                    <Text size="sm" color="light">
                      •
                    </Text>
                    <Text size="sm" color="light">
                      {/* @ts-expect-error: */}
                      <View slug={content.slug} type="view" /> views
                    </Text>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <hr />
          <div className="flex justify-center pb-8">
            <Link
              href="/"
              className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
            >
              <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[2px] group-active:translate-x-[-2px]">
                ←
              </span>
              Home
            </Link>
          </div>
        </div>
      </article>
      <div className="hidden h-min w-full max-w-[14rem] justify-end pt-8 xl:flex xl:max-w-[16rem]">
        <Link
          href="/"
          className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
        >
          <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[2px] group-active:translate-x-[-2px]">
            ←
          </span>
          Home
        </Link>
      </div>
    </>
  );
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

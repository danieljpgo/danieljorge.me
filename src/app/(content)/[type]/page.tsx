import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { messages } from "~/lib/content";
import { genericMetadata } from "~/lib/metadata";
import { documents, routes } from "~/lib/contentlayer";
import { formatDateNumerical } from "~/lib/date";
import { Heading, Text, View } from "~/components";

type ContentsProps = {
  params: { type: string };
};
export default function Contents({ params }: ContentsProps) {
  const contents = documents.filter(
    (doc) => doc._raw.sourceFileDir === params.type,
  );
  if (!contents.length) return notFound();

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
            {messages[contents[0].type].title}
          </Heading>
          <Text color="base">{messages[contents[0].type].description}</Text>
        </div>
        <hr />
        <div className="grid gap-4">
          <ul className="grid gap-4">
            {contents.map((content) => (
              <li key={content.slug}>
                <article className="grid gap-1">
                  <Link href={`/${content._raw.flattenedPath}`}>
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

export function generateStaticParams(): Array<ContentsProps["params"]> {
  return routes.map((path) => ({ type: path }));
}

export function generateMetadata({ params }: ContentsProps): Metadata {
  const contents = documents.filter(
    (doc) => doc._raw.sourceFileDir === params.type,
  );
  if (!contents.length) return notFound();

  const metadata = {
    title: messages[contents[0].type].title,
    description: messages[contents[0].type].description,
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

const baseURL = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { messages, topics } from "~/lib/content";
import { genericMetadata } from "~/lib/metadata";
import { documents } from "~/lib/contentlayer";
import { cn } from "~/lib/tailwindcss";
import { Heading, Mdx, Text, View } from "~/components";

type ContentProps = {
  params: { type: string; slug: string };
};
export default function Content({ params }: ContentProps) {
  const content = documents.find((doc) => doc.slug === params.slug);
  if (!content) return notFound();

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          content.headings.length ? "mt-[68px]" : "mt-[100px]",
        )}
      >
        {Boolean(content.headings.length) && (
          <>
            <Heading as="h2" size="lg" weight="semibold" color="darker">
              Table of Contents
            </Heading>
            <hr />
          </>
        )}
        <nav className="grid gap-1">
          {
            // @TODO FIX here
            (
              content.headings as Array<{
                level: number;
                slug: string;
                content: string;
              }>
            )
              .filter((heading) => heading.level !== 1)
              .map((heading, index) => (
                <a
                  key={heading.slug}
                  href={`#${heading.slug}`}
                  className={cn(
                    "text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
                    heading.level === 2 && index !== 0 && "mt-1",
                    heading.level === 3 && "ml-1.5 text-xs",
                    heading.level === 4 && "ml-3 text-xs",
                  )}
                >
                  {heading.content}
                </a>
              ))
          }
          <hr className="my-1.5" />
          <a
            href="#"
            className="text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
          >
            Back to top
          </a>
        </nav>
      </aside>
      <article className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <Text size="sm" color="light">
              {"createdAtFormatted" in content
                ? content.createdAtFormatted
                : content.publishedAtFormatted}
            </Text>
            <div className="flex justify-end gap-1 text-right">
              <Text color="lighter" size="xs">
                {/* @ts-expect-error: */}
                <View slug={params.slug} type="counter" />
              </Text>
              <Text color="lighter" size="xs">
                views
              </Text>
            </div>
          </div>
          <Heading
            as="h1"
            size="2xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {content.title}
          </Heading>
          <Text color="base">{content.description}</Text>
        </div>
        <hr />
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col flex-wrap">
              <Text color="light" size="xs" weight="medium">
                {messages[content.type].title}
              </Text>
              <div className="max-w-[180px] sm:max-w-none">
                <Text color="lighter" size="xs">
                  {messages[content.type].description}
                </Text>
              </div>
            </div>
            <div>
              <div className="flex max-w-[100px] flex-wrap justify-end gap-x-1 md:flex-row">
                {content.topics
                  .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
                  .map((topic) => (
                    <Link
                      key={topic}
                      href={`/topics/${topic}`}
                      className="whitespace-nowrap text-xs text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
                    >
                      {topics[topic]}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <Mdx code={content.body.code} />
          <hr />
          <div className="flex justify-center pb-8">
            <Link
              href={`/${params.type}`}
              className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
            >
              <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[2px] group-active:translate-x-[-2px]">
                ←
              </span>
              {messages[content.type].title}
            </Link>
          </div>
        </div>
      </article>
      <div className="hidden h-min w-full max-w-[14rem] justify-end pt-8 xl:flex xl:max-w-[16rem]">
        <Link
          href={`/${params.type}`}
          className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
        >
          <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[2px] group-active:translate-x-[-2px]">
            ←
          </span>
          {messages[content.type].title}
        </Link>
      </div>
    </>
  );
}

export function generateStaticParams(): Array<ContentProps["params"]> {
  return documents.map((doc) => ({
    type: doc._raw.sourceFileDir,
    slug: doc.slug,
  }));
}

export function generateMetadata({ params }: ContentProps): Metadata {
  const content = documents.find((doc) => doc.slug === params.slug);
  if (!content) return notFound();

  const metadata = {
    title: content.title,
    description: content.description,
  };

  const og = new URLSearchParams({
    title: metadata.title,
    description: metadata.description,
    type: "content",
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
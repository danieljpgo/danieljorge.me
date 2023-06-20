import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { topics } from "~/lib/content";
import { documents } from "~/lib/contentlayer";
import { Heading, Text, View } from "~/components";
import { formatDateNumerical } from "~/lib/date";
import { genericMetadata } from "~/lib/metadata";

type TopicProps = {
  params: { slug: keyof typeof topics };
};

export default function Topic({ params }: TopicProps) {
  if (!Object.keys(topics).includes(params.slug)) {
    notFound();
  }

  const selectedDocuments = documents.filter((document) =>
    document.topics.includes(params.slug),
  );

  return (
    <>
      <div className="flex flex-col gap-2 pt-7">
        <Heading
          as="h1"
          size="2xl"
          weight="semibold"
          leading="tight"
          color="darker"
        >
          {topics[params.slug]}
        </Heading>
        <Text color="base">{`lorem`}</Text>
      </div>
      <hr />
      <div className="grid gap-4">
        <ul className="grid gap-4">
          {selectedDocuments.map((content) => (
            <li key={content.slug}>
              <article className="grid gap-1">
                <Link href={content._raw.flattenedPath}>
                  <Heading
                    as="h3"
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
                    {(() => {
                      if ("createdAt" in content) {
                        return content.createdAtFormatted;
                      }
                      return content.publishedAtFormatted;
                    })()}
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
    </>
  );
}

export async function generateStaticParams(): Promise<
  Array<TopicProps["params"]>
> {
  return (Object.keys(topics) as Array<keyof typeof topics>).map((slug) => ({
    slug,
  }));
}

type generateMetadataProps = {
  params: TopicProps["params"];
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const selectedDocuments = documents.filter((document) =>
    document.topics.includes(params.slug),
  );
  if (!selectedDocuments.length) {
    notFound();
  }

  const url = `${
    process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000"
  }/api/og?${new URLSearchParams({
    title: topics[params.slug],
    description: "lorem",
    type: "list",
    items: selectedDocuments
      .map((a) => {
        if ("createdAt" in a) {
          return `${formatDateNumerical(a.createdAt)};${a.title}`;
        }
        return `${formatDateNumerical(a.publishedAt)};${a.title}`;
      })
      .slice(0, 10)
      .join("|"),
  }).toString()}`;

  return {
    title: topics[params.slug],
    description: "lorem",
    twitter: {
      ...genericMetadata.twitter,
      title: topics[params.slug],
      description: "lorem",
      images: {
        ...genericMetadata.twitter.images,
        url,
        // alt: `Banner with title "${note.title}" and description "${note.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: topics[params.slug],
      description: "lorem",
      images: [
        {
          ...genericMetadata.openGraph.images[0],
          url,
          // alt: `Banner with title "${note.title}" and description "${note.description}"`,
        },
      ],
    },
  };
}

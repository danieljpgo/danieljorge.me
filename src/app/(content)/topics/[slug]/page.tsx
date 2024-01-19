import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { documents } from "~/lib/contentlayer";
import { OG, topics } from "~/lib/content";
import { baseUrl, genericMetadata } from "~/lib/metadata";
import { Heading, Text, View } from "~/components";

type TopicProps = {
  params: { slug: keyof typeof topics };
};
export default function Topic({ params }: TopicProps) {
  if (!Object.keys(topics).includes(params.slug)) return notFound();
  const contents = documents.filter((doc) => doc.topics.includes(params.slug));

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
            {topics[params.slug]}
          </Heading>
          <Text color="base">{`Writings, notes, diagrams, and more related to ${
            topics[params.slug]
          }`}</Text>
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
                      {"createdAt" in content
                        ? content.createdAtFormatted
                        : content.publishedAtFormatted}
                    </Text>
                    <Text size="sm" color="light">
                      •
                    </Text>
                    <Text size="sm" color="light">
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

export async function generateStaticParams(): Promise<
  Array<TopicProps["params"]>
> {
  // @TODO fix TS HERE
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
  const contents = documents.filter((doc) => doc.topics.includes(params.slug));
  if (!contents.length) return notFound();

  const metadata = {
    title: `${topics[params.slug]}`,
    description: `Writings, notes, diagrams and more related to ${
      topics[params.slug]
    }`,
  };

  const og = new URLSearchParams({
    type: OG.TYPE.LIST,
    topic: params.slug,
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
        url: `${baseUrl}/api/og?${og}`,
        alt: `Banner with title "${metadata.title}", description "${metadata.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          ...genericMetadata.openGraph.images[0],
          url: `${baseUrl}/api/og?${og}`,
          alt: `Banner with title "${metadata.title}", description "${metadata.description}"`,
        },
      ],
    },
  };
}

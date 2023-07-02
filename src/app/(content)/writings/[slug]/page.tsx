import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { writings } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
import { Heading, Text, Mdx, View } from "~/components";
import { topics } from "~/lib/content";

type WritingProps = {
  params: { slug: string };
};

export default function Writing({ params }: WritingProps) {
  const writing = writings.find((writing) => writing.slug === params.slug);

  if (!writing) {
    notFound();
  }

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          writing.headings.length ? "mt-[68px]" : "mt-[100px]",
        )}
      >
        {Boolean(writing.headings.length) && (
          <>
            <Heading as="h2" size="lg" weight="semibold" color="darker">
              Table of Contents
            </Heading>
            <hr />
          </>
        )}
        <nav className="grid gap-1">
          {writing.headings
            .filter((heading) => heading.level === 2 || heading.level === 3)
            .map((heading, index) => (
              <a
                key={heading.slug}
                href={`#${heading.slug}`}
                className={cn(
                  "text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
                  heading.level === 2 && index !== 0 && "mt-1",
                  heading.level === 3 && "ml-1.5 text-xs",
                )}
              >
                {heading.content}
              </a>
            ))}
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
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <Text size="sm" color="light">
              {writing.publishedAtFormatted}
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
            {writing.title}
          </Heading>
          <Text color="base">{writing.description}</Text>
        </div>
        <hr />
        <div className="grid gap-8">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col flex-wrap">
              <Text color="light" size="xs" weight="medium">
                Writings
              </Text>
              <div className="max-w-[180px] sm:max-w-none">
                <Text color="lighter" size="xs">
                  Crafted, long form thoughts and ideas.
                </Text>
              </div>
            </div>
            <div>
              <div className="flex max-w-[100px] flex-wrap justify-end gap-x-1 md:flex-row">
                {writing.topics
                  .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
                  .map((topic) => (
                    <Link
                      key={topic}
                      href={`/topics/${topic}`}
                      prefetch={false}
                      className="whitespace-nowrap text-xs text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
                    >
                      {topics[topic]}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <Mdx code={writing.body.code} />
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
  Array<WritingProps["params"]>
> {
  return writings.map((page) => ({ slug: page.slug }));
}

type generateMetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const writing = writings.find((post) => post.slug === params.slug);

  if (!writing) {
    notFound();
  }

  const url = `${
    process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000"
  }/api/og?${new URLSearchParams({
    title: writing.title,
    description: writing.description,
    type: "content",
  }).toString()}`;

  return {
    title: writing.title,
    description: writing.description,
    twitter: {
      ...genericMetadata.twitter,
      title: writing.title,
      description: writing.description,
      images: {
        ...genericMetadata.twitter.images,
        url,
        // alt: `Banner with title "${writing.title}" and description "${writing.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: writing.title,
      description: writing.description,
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

// @TODO: melhorar lidar com caso de não encontrar o , 404?
// @TODO: bug de renderização do botão voltar

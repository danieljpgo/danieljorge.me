import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { crafts } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
import { Heading, Text, Mdx, View } from "~/components";

type CraftsProps = {
  params: { slug: string };
};

export default function Crafts({ params }: CraftsProps) {
  const craft = crafts.find((craft) => craft.slug === params.slug);

  if (!craft) {
    notFound();
  }

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          craft.headings.length ? "mt-[68px]" : "mt-[100px]",
        )}
      >
        {Boolean(craft.headings.length) && (
          <>
            <Heading as="h2" size="lg" weight="semibold" color="darker">
              Table of Contents
            </Heading>
            <hr />
          </>
        )}
        <nav className="grid gap-1">
          {craft.headings
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
      <article className="flex w-full max-w-2xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text size="sm" color="light">
            {craft.createdAtFormatted}
          </Text>
          <Heading
            as="h1"
            size="2xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {craft.title}
          </Heading>
          <Text color="base">{craft.description}</Text>
        </div>
        <hr />
        <div className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between">
            <div>
              <Text color="light" size="xs" weight="medium">
                Crafts
              </Text>
              <div className="max-w-[180px] sm:max-w-none">
                <Text color="lighter" size="xs">
                  Build, concepts, techniques, solutions and explaining in
                  detail.
                </Text>
              </div>
            </div>
            <div className="gap-1 self-end text-right md:flex">
              <Text color="lighter" size="xs">
                {/* @ts-expect-error: */}
                <View slug={params.slug} type="counter" />
              </Text>
              <Text color="lighter" size="xs">
                views
              </Text>
            </div>
          </div>
          <Mdx code={craft.body.code} />
          <hr />
          <div className="flex justify-center pb-8">
            <Link
              href="/"
              className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
            >
              <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-[2px] group-active:translate-x-[-2px]">
                ←
              </span>
              Crafts
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
          Crafts
        </Link>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<
  Array<CraftsProps["params"]>
> {
  return crafts.map((page) => ({ slug: page.slug }));
}

type generateMetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({
  params,
}: generateMetadataProps): Promise<Metadata> {
  const craft = crafts.find((craft) => craft.slug === params.slug);

  if (!craft) {
    notFound();
  }

  const url = `${
    process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000"
  }/api/og?${new URLSearchParams({
    title: craft.title,
    // images: craft.images.toString(),
    type: "craft",
  }).toString()}`;

  return {
    title: craft.title,
    description: craft.description,
    twitter: {
      ...genericMetadata.twitter,
      title: craft.title,
      description: craft.description,
      images: {
        ...genericMetadata.twitter.images,
        url,
        // alt: `Banner with title "${note.title}" and description "${note.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: craft.title,
      description: craft.description,
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

// @TODO: melhorar lidar com caso de não encontrar o note, 404?
// @TODO: bug de renderização do botão voltar

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { configs } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
import { Heading, Text, Mdx, View } from "~/components";

type ConfigProps = {
  params: { slug: string };
};

export default function Config({ params }: ConfigProps) {
  const config = configs.find((config) => config.slug === params.slug);

  if (!config) {
    notFound();
  }

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          config.headings.length ? "mt-[68px]" : "mt-[100px]",
        )}
      >
        {Boolean(config.headings.length) && (
          <>
            <Heading as="h2" size="lg" weight="semibold" color="darker">
              Table of Contents
            </Heading>
            <hr />
          </>
        )}
        <nav className="grid gap-1">
          {config.headings
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
          <Text size="sm" color="light">
            {config.createdAtFormatted}
          </Text>
          <Heading
            as="h1"
            size="2xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {config.title}
          </Heading>
          <Text color="base">{config.description}</Text>
        </div>
        <hr />
        <div className="grid gap-8">
          <div className="flex items-baseline justify-between">
            <div>
              <Text color="light" size="xs" weight="medium">
                Configs
              </Text>
              <div className="max-w-[180px] sm:max-w-none">
                <Text color="lighter" size="xs">
                  Settings, shortcuts and everything related to productivity.
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
          <Mdx code={config.body.code} />
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

// export async function generateStaticParams(): Promise<
//   Array<NoteProps["params"]>
// > {
//   return notes.map((page) => ({ slug: page.slug }));
// }

// type generateMetadataProps = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
// export async function generateMetadata({
//   params,
// }: generateMetadataProps): Promise<Metadata> {
//   const note = notes.find((post) => post.slug === params.slug);

//   if (!note) {
//     notFound();
//   }

//   const url = `${
//     process.env.VERCEL_URL
//       ? "https://" + process.env.VERCEL_URL
//       : "http://localhost:3000"
//   }/api/og?${new URLSearchParams({
//     title: note.title,
//     description: note.description,
//     type: "content",
//   }).toString()}`;

//   return {
//     title: note.title,
//     description: note.description,
//     twitter: {
//       ...genericMetadata.twitter,
//       title: note.title,
//       description: note.description,
//       images: {
//         ...genericMetadata.twitter.images,
//         url,
//         // alt: `Banner with title "${note.title}" and description "${note.description}"`,
//       },
//     },
//     openGraph: {
//       ...genericMetadata.openGraph,
//       title: note.title,
//       description: note.description,
//       images: [
//         {
//           ...genericMetadata.openGraph.images[0],
//           url,
//           // alt: `Banner with title "${note.title}" and description "${note.description}"`,
//         },
//       ],
//     },
//   };
// }

// @TODO: melhorar lidar com caso de não encontrar o note, 404?
// @TODO: bug de renderização do botão voltar
// @TODO: animação para views (tabular-nums?)

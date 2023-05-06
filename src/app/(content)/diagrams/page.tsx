import type { Metadata } from "next";
import Link from "next/link";
import { Heading, Text, Views } from "~/components";
import { diagrams } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";
import { cn } from "~/lib/tailwindcss";

export const metadata: Metadata = {
  title: "Diagrams",
  description: "Explanations, concepts, design solutions, created over time.",
  twitter: {
    ...genericMetadata.twitter,
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
    images: {
      ...genericMetadata.twitter.images,
      url: `${
        process.env.VERCEL_URL
          ? "https://" + process.env.VERCEL_URL
          : "http://localhost:3000"
      }/api/og?${new URLSearchParams({
        title: "Diagrams",
        description:
          "Explanations, concepts, design solutions, created over time.",
        type: "list",
        items: diagrams
          .map((a) => `${a.createdAtFormatted}-${a.title}`)
          .slice(0, 10)
          .toString(),
      }).toString()}`,
    },
  },
  openGraph: {
    ...genericMetadata.openGraph,
    title: "Diagrams",
    description: "Explanations, concepts, design solutions, created over time.",
    images: [
      {
        ...genericMetadata.openGraph.images[0],
        url: `${
          process.env.VERCEL_URL
            ? "https://" + process.env.VERCEL_URL
            : "http://localhost:3000"
        }/api/og?${new URLSearchParams({
          title: "Diagrams",
          description:
            "Explanations, concepts, design solutions, created over time.",
          type: "list",
          items: diagrams
            .map((a) => `${a.createdAtFormatted}-${a.title}`)
            .slice(0, 10)
            .join("|"),
        }).toString()}`,
      },
    ],
  },
};

export default function Diagrams() {
  const sortedDiagrams = [...diagrams].sort(
    (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)),
  );

  return (
    <>
      <aside
        className={cn(
          "sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]",
          "mt-[124px]",
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
            Diagrams
          </Heading>
          <Text color="base">
            {`A list of diagrams I've created over time to help me explain
           and think about concepts, design solutions and more.`}
          </Text>
        </div>
        <hr />
        <div className="grid gap-4">
          <ul className="grid gap-4">
            {sortedDiagrams.map((diagram) => (
              <li key={diagram.slug}>
                <article className="grid gap-1">
                  <Link href={diagram._raw.flattenedPath}>
                    <Heading
                      as="h3"
                      size="base"
                      weight="medium"
                      leading="tight"
                      color="darker"
                    >
                      {diagram.title}
                    </Heading>
                  </Link>
                  <div className="flex gap-2">
                    <Text size="sm" color="light">
                      {diagram.createdAtFormatted}
                    </Text>
                    <Text size="sm" color="light">
                      •
                    </Text>
                    <Text size="sm" color="light">
                      <Views slug={diagram.slug} type="view" /> views
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

import type { Metadata } from "next";
import Link from "next/link";
import { Heading, Text, View } from "~/components";
import { configs, diagrams } from "~/lib/contentlayer";
import { formatDateNumerical } from "~/lib/date";
import { genericMetadata } from "~/lib/metadata";
import { cn } from "~/lib/tailwindcss";

export const metadata: Metadata = {
  title: "Configs",
  description: "Settings, shortcuts and everything related to productivity.",
  twitter: {
    ...genericMetadata.twitter,
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
    images: {
      ...genericMetadata.twitter.images,
      url: `${
        process.env.VERCEL_URL
          ? "https://" + process.env.VERCEL_URL
          : "http://localhost:3000"
      }/api/og?${new URLSearchParams({
        title: "Configs",
        description:
          "Settings, shortcuts and everything related to productivity.",
        type: "list",
        items: configs
          .map((a) => `${formatDateNumerical(a.createdAt)};${a.title}`)
          .slice(0, 10)
          .join("|"),
      }).toString()}`,
    },
  },
  openGraph: {
    ...genericMetadata.openGraph,
    title: "Configs",
    description: "Settings, shortcuts and everything related to productivity.",
    images: [
      {
        ...genericMetadata.openGraph.images[0],
        url: `${
          process.env.VERCEL_URL
            ? "https://" + process.env.VERCEL_URL
            : "http://localhost:3000"
        }/api/og?${new URLSearchParams({
          title: "Configs",
          description:
            "Settings, shortcuts and everything related to productivity.",
          type: "list",
          items: configs
            .map((a) => `${formatDateNumerical(a.createdAt)};${a.title}`)
            .slice(0, 10)
            .join("|"),
        }).toString()}`,
      },
    ],
  },
};

export default function Configs() {
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
            Configs
          </Heading>
          <Text color="base">
            {`Settings, shortcuts and everything related to productivity.`}
          </Text>
        </div>
        <hr />
        <div className="grid gap-4">
          <ul className="grid gap-4">
            {configs.map((config) => (
              <li key={config.slug}>
                <article className="grid gap-1">
                  <Link href={config._raw.flattenedPath}>
                    <Heading
                      as="h3"
                      size="base"
                      weight="medium"
                      leading="tight"
                      color="darker"
                    >
                      {config.title}
                    </Heading>
                  </Link>
                  <div className="flex gap-2">
                    <Text size="sm" color="light">
                      {config.createdAtFormatted}
                    </Text>
                    <Text size="sm" color="light">
                      •
                    </Text>
                    <Text size="sm" color="light">
                      {/* @ts-expect-error: */}
                      <View slug={config.slug} type="view" /> views
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

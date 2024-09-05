import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "~/lib/tailwindcss";
import { topics } from "~/lib/contentlayer";
import { OG, PAGE, TOPIC, messages } from "~/lib/content";
import { baseUrl, genericMetadata } from "~/lib/metadata";
import { Heading, Text } from "~/components";

export default function Topics() {
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
            {messages[PAGE.TOPICS].title}
          </Heading>
          <Text color="base">{messages[PAGE.TOPICS].description}</Text>
        </div>
        <hr />
        <div className="grid gap-4">
          <ul className="grid gap-4">
            {/* {Object.entries(topics).map(([topic, amount]) => ( */}
            {Object.values(TOPIC).map((topic) => (
              <li key={topic}>
                <article>
                  <Link href={`/topics/${topic}`} className="flex gap-1">
                    <Heading
                      as="h2"
                      size="base"
                      weight="medium"
                      leading="tight"
                      color="darker"
                    >
                      {messages[topic]}
                    </Heading>
                    <Text size="sm" color="light">
                      •
                    </Text>
                    <Text size="sm" color="light">
                      ({topics[topic]})
                    </Text>
                  </Link>
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

export function generateMetadata(): Metadata {
  const metadata = {
    title: messages[PAGE.TOPICS].title,
    description: messages[PAGE.TOPICS].description,
    og: new URLSearchParams({
      type: OG.INDEX,
      page: PAGE.TOPICS,
    }).toString(),
  };

  return {
    title: metadata.title,
    description: metadata.description,
    twitter: {
      ...genericMetadata.twitter,
      title: metadata.title,
      description: metadata.description,
      images: {
        ...genericMetadata.twitter.images,
        url: `${baseUrl}/api/og?${metadata.og}`,
        alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          ...genericMetadata.openGraph.images,
          url: `${baseUrl}/api/og?${metadata.og}`,
          alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
        },
      ],
    },
  };
}

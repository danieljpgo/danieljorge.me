import Link from "next/link";
import { notFound } from "next/navigation";
import { topics } from "~/lib/content";
import { documents } from "~/lib/contentlayer";
import { Heading, Text, View } from "~/components";

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

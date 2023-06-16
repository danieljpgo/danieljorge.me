import { configs, crafts, diagrams, notes } from "~/lib/contentlayer";
import { topics } from "~/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Heading, Text, View } from "~/components";

type TopicProps = {
  params: { slug: string };
};

export default function Topic({ params }: TopicProps) {
  if (!Object.keys(topics).includes(params.slug)) {
    notFound();
  }

  const selectedNotes = notes.filter((notes) =>
    notes.topics.includes(params.slug),
  );
  const selectedCraft = crafts.filter((craft) =>
    craft.topics.includes(params.slug),
  );
  const selectedDiagrams = diagrams.filter((diagram) =>
    diagram.topics.includes(params.slug),
  );
  // const selectedConfigs = configs.find((config) =>
  //   config.topics.includes(params.slug),
  // );

  console.log(selectedNotes.map((data) => data.title));
  console.log(selectedCraft.map((data) => data.title));
  console.log(selectedDiagrams.map((data) => data.title));
  // console.log(selectedConfigs);
  return (
    <div>
      <ul className="grid gap-4">
        {[...selectedNotes, ...selectedCraft, ...selectedDiagrams].map(
          (diagram) => (
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
                    {(() => {
                      if ("createdAtFormatted" in diagram) {
                        return diagram.createdAtFormatted;
                      }
                      return diagram.publishedAtFormatted;
                    })()}
                  </Text>
                  <Text size="sm" color="light">
                    •
                  </Text>
                  <Text size="sm" color="light">
                    {/* @ts-expect-error: */}
                    <View slug={diagram.slug} type="view" /> views
                  </Text>
                </div>
              </article>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export async function generateStaticParams(): Promise<
  Array<TopicProps["params"]>
> {
  return Object.keys(topics).map((slug) => ({ slug }));
}

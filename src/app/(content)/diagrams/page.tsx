import Link from "next/link";
import { Heading, Text } from "~/components";
import { diagrams } from "~/lib/contentlayer";

export default function Diagrams() {
  return (
    <div>
      <Heading
        as="h2"
        size="2xl"
        weight="semibold"
        leading="tight"
        color="darker"
      >
        Diagrams
      </Heading>
      <div className="mt-2">
        <Text color="base">
          {`Here is a list of diagrams I've created over time to help me explain
          and think about concepts, design solutions and more.`}
        </Text>
      </div>
      <hr className="mt-4 py-4" />
      <ul className="grid gap-4">
        {diagrams.map((diagram) => (
          <li key={diagram._id}>
            <article className="grid gap-4">
              <div className="grid gap-1">
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
                <Text size="sm" color="light">
                  {diagram.createdAtFormatted}
                </Text>
                <div className="mt-2">
                  <Text color="base">{diagram.description}</Text>
                </div>
              </div>
            </article>
            <hr className="mt-4 py-2" />
          </li>
        ))}
      </ul>
    </div>
  );
}

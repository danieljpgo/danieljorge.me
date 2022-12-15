import Link from "next/link";
import { Heading, Text } from "~/components";
import { notes } from "~/lib/contentlayer";

export default function Notes() {
  const notesPublished = notes.filter((note) => note.status === "published");

  return (
    <>
      <Heading
        as="h2"
        size="2xl"
        weight="semibold"
        leading="tight"
        color="darker"
      >
        Notes
      </Heading>
      <div className="mt-2">
        <Text color="base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          recusandae lorem abc.
        </Text>
      </div>
      <hr className="mt-4 py-4" />
      <ul className="grid gap-4">
        {notesPublished.map((note) => (
          <li key={note.slug}>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href={note._raw.flattenedPath}>
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    {note.title}
                  </Heading>
                </Link>
                <Text size="sm" color="light">
                  {note.publishedAtFormatted}
                </Text>
                <div className="mt-2">
                  <Text color="base">{note.description}</Text>
                </div>
              </div>
            </article>
            <hr className="mt-4 py-2" />
          </li>
        ))}
      </ul>
    </>
  );
}

// @TODO Melhorar lidar com caso de não encontrar o note, 404?

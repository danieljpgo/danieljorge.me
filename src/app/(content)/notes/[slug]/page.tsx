import { notFound } from "next/navigation";
import { allNotes } from "~/contentlayer";
import { formatDate } from "~/lib/date";
import { Heading, Text, Mdx } from "~/components";

type NoteProps = {
  params: { slug: string };
};

export default function Note({ params }: NoteProps) {
  const note = allNotes.find((notes) => notes.slug === params.slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <aside className="sticky top-0 h-min">
        <h2>table of content</h2>
        <nav>
          <a href="#">back to top</a>
        </nav>
      </aside>
      <article className="max-w-2xl">
        <div className="flex flex-col space-y-2">
          <Text size="sm" color="light">
            {formatDate(note.date)}
          </Text>
          <Heading
            as="h2"
            size="2xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {note.title}
          </Heading>
        </div>
        <hr className="mt-4 py-4" />
        <Mdx code={note.body.code} />
      </article>
      <div>
        <a href=".">back to notes</a>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<
  Array<NoteProps["params"]>
> {
  return allNotes.map((page) => ({
    slug: page.slug,
  }));
}

// @TODO Melhorar lidar com caso de não encontrar o note, 404?

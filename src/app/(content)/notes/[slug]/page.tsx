import { notFound } from "next/navigation";
import { Heading, Text, Mdx } from "~/components";
import { notes } from "~/lib/contentlayer";

type NoteProps = {
  params: { slug: string };
};

export default function Note({ params }: NoteProps) {
  const note = notes.find((notes) => notes.slug === params.slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <aside className="sticky top-0 h-min">
        <h2>table of content</h2>
        <nav className="grid gap-2">
          {note.headings
            .filter((heading) => heading.level === 2)
            .map((heading) => (
              <a key={heading.slug} href={`#${heading.slug}`}>
                {heading.content}
              </a>
            ))}
          <a href="#">back to top</a>
        </nav>
      </aside>
      <article className="max-w-2xl">
        <div className="flex flex-col space-y-2">
          <Text size="sm" color="light">
            {note.publishedAtFormatted}
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
  return notes.map((page) => ({ slug: page.slug }));
}

// @TODO Melhorar lidar com caso de não encontrar o note, 404?

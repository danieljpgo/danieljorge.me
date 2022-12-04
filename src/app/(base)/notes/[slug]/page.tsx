import { allNotes } from "contentlayer/generated";
import { Heading, Text } from "~/components";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

type NoteProps = {
  params: { slug: string };
};

export default function Note(props: NoteProps) {
  const { params } = props;
  const note = allNotes.find((notes) => notes.slug === params.slug);

  if (!note) {
    notFound();
  }

  const MDXContent = useMDXComponent(note.body.code);

  return (
    <article>
      <div className="flex flex-col space-y-2">
        <Heading
          as="h2"
          size="2xl"
          weight="semibold"
          leading="tight"
          color="darker"
        >
          {note.title}
        </Heading>
        <Text size="sm" color="light">
          {note.date}
        </Text>
      </div>
      <hr className="mt-4 py-4" />
      <MDXContent />
    </article>
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

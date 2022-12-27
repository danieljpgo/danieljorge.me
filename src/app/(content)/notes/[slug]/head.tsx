import { allNotes } from "contentlayer/generated";
import { HeadTags, OGTags } from "~/components";

type HeadProps = {
  params: { slug: string };
};

export default function Head({ params }: HeadProps) {
  const note = allNotes.find((notes) => notes.slug === params.slug);

  if (!note) {
    return (
      <>
        <title>Error</title>
        <meta name="description" content="Error" />
        <HeadTags />
      </>
    );
  }

  return (
    <>
      <title>{note.title}</title>
      <meta name="description" content={note.description} />
      <HeadTags />
      <OGTags
        type="content"
        title={note.title}
        description={note.description}
      />
    </>
  );
}

// @TODO Melhorar lidar com caso de não encontrar o slug, 404?

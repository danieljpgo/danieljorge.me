import { HeadTags, OGTags } from "~/components";
import { notes } from "~/lib/contentlayer";

type HeadProps = {
  params: { slug: string };
};

export default function Head({ params }: HeadProps) {
  const note = notes.find((notes) => notes.slug === params.slug);

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

// @TODO: melhorar implementação do <Head/>
// @TODO: melhorar lidar com caso de não encontrar o slug, 404?

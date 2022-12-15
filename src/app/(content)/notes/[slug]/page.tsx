import { notFound } from "next/navigation";
import { notes } from "~/lib/contentlayer";
import { Heading, Text, Mdx } from "~/components";

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
      <aside className="sticky top-8 hidden h-min w-full max-w-[14rem] justify-start gap-2 lg:grid xl:max-w-[16rem]">
        <Heading
          as="h2"
          size="base"
          weight="medium"
          color="darker"
          // leading="tight"
        >
          Table of Content
        </Heading>
        <hr />
        <nav className="grid gap-1">
          {note.headings
            .filter((heading) => heading.level === 2 || heading.level === 3)
            .map((heading) =>
              heading.level === 2 ? (
                <a
                  key={heading.slug}
                  href={`#${heading.slug}`}
                  className="text-sm"
                >
                  {heading.content}
                </a>
              ) : (
                <a
                  key={heading.slug}
                  href={`#${heading.slug}`}
                  className="ml-2 text-xs"
                >
                  {heading.content}
                </a>
              ),
            )}
          <hr />
          <a href="#" className="text-sm">
            Back to top
          </a>
        </nav>
      </aside>
      {/* <article className="w-full max-w-2xl lg:ml-auto xl:ml-0"> */}
      <article className="w-full max-w-2xl">
        <div className="flex flex-col space-y-2">
          <Text size="sm" color="light">
            {note.publishedAtFormatted}
          </Text>
          <Heading
            as="h1"
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
      {/* lg:contents */}
      <div className="sticky top-0 hidden w-full max-w-[14rem] justify-end xl:flex xl:max-w-[16rem]">
        <a href="." className="flex gap-2">
          {/* lg:ml-12 xl:ml-0 */}
          ⬅️ <span className="hidden xl:flex">back to notes</span>
        </a>
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

import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "~/lib/tailwindcss";
import { notes } from "~/lib/contentlayer";
import { Heading, Text, Mdx, Views } from "~/components";

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
      <aside className="sticky top-8 mt-[68px] hidden h-min w-full max-w-[14rem] justify-start gap-2.5 lg:grid xl:max-w-[16rem]">
        {Boolean(note.headings.length) ? (
          <>
            <Heading as="h2" size="lg" weight="semibold" color="darker">
              Table of Contents
            </Heading>
            <hr />
            <nav className="grid gap-1">
              {note.headings
                .filter((heading) => heading.level === 2 || heading.level === 3)
                .map((heading, index) =>
                  heading.level === 2 ? (
                    <a
                      key={heading.slug}
                      href={`#${heading.slug}`}
                      className={cn(
                        "text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300",
                        index !== 0 && "mt-1",
                      )}
                    >
                      {heading.content}
                    </a>
                  ) : (
                    <a
                      key={heading.slug}
                      href={`#${heading.slug}`}
                      className="ml-1.5 text-xs text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
                    >
                      {heading.content}
                    </a>
                  ),
                )}
              <hr className="my-1.5" />
              <a
                href="#"
                className="text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
              >
                Back to top
              </a>
            </nav>
          </>
        ) : (
          <nav className="mt-8 grid gap-1">
            <hr className="my-1.5" />
            <a
              href="#"
              className="text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
            >
              Back to top
            </a>
          </nav>
        )}
      </aside>
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
          <Text color="base">{note.description}</Text>
        </div>
        <hr className="mt-4 py-4 pt-4 pb-0" />
        <div className="flex items-baseline justify-between pb-8 sm:pb-4">
          {/* <div className="flex items-baseline justify-between pb-8 text-right sm:flex-col sm:items-end sm:justify-end sm:pb-4"> */}
          <div>
            <Text color="light" size="xs" weight="medium">
              Notes
            </Text>
            <div className="max-w-[180px] sm:max-w-none">
              <Text color="lighter" size="xs">
                Loose, short form thoughts, reflections and ideas
              </Text>
            </div>
          </div>
          <div className="gap-1 self-end text-right md:flex">
            <Text color="lighter" size="xs">
              <Views slug={params.slug} type="counter" />
            </Text>
            <Text color="lighter" size="xs">
              views
            </Text>
          </div>
        </div>
        <Mdx code={note.body.code} />
        <hr className="mt-8 mb-8" />
        <div className="flex justify-center pb-8">
          <Link
            href="/"
            className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
          >
            <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-[-2px]">
              ←
            </span>
            Home
          </Link>
        </div>
      </article>
      {/* sticky top-0 */}
      <div className="hidden h-min w-full max-w-[14rem] justify-end pt-8 xl:flex xl:max-w-[16rem]">
        <Link
          href="/"
          className="group flex gap-2 text-sm text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
        >
          <span className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-[-2px]">
            ←
          </span>
          Home
        </Link>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<
  Array<NoteProps["params"]>
> {
  return notes.map((page) => ({ slug: page.slug }));
}

// @TODO: melhorar lidar com caso de não encontrar o note, 404?
// @TODO: bug de renderização do botão voltar
// @TODO: animação para views (tabular-nums?)

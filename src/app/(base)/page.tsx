import Link from "next/link";
import Image from "next/image";
import profile from "~/public/profile.jpeg";
import { allNotes } from "~/contentlayer";
import { formatDate } from "~/lib/date";
import {
  GithubIcon,
  Heading,
  LinkedinIcon,
  Text,
  TwitterIcon,
} from "~/components";

export default function Home() {
  const notes = allNotes;

  return (
    <div className="grid gap-8 md:px-10">
      <div className="flex gap-4">
        <Image
          quality={100}
          src={profile}
          height={72}
          width={72}
          placeholder="blur"
          alt="Daniel Jorge profile picture"
          className="rounded-full"
        />
        <div className="flex flex-col gap-2 self-center">
          <h1 className="text-lg font-medium leading-4 text-gray-800 antialiased">
            Daniel Jorge
          </h1>
          <p className="text-base font-medium leading-4 text-slate-600 antialiased">
            Frontend Engineer
          </p>
        </div>
      </div>
      <Text>
        Engineer interested at Functional Programming, React, Design System and
        TypeScript, currently working at{" "}
        <a
          href="https://bitso.com/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-800 underline decoration-gray-800 underline-offset-2"
        >
          Bitso
        </a>
        .
      </Text>

      <ul aria-label="Social links" className="flex gap-3">
        <li>
          <a
            aria-label="Github"
            href="https://github.com/danieljpgo"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 transition-colors duration-300 hover:text-gray-400 active:text-gray-300"
          >
            <GithubIcon />
          </a>
        </li>
        <li>
          <a
            aria-label="Twitter"
            href="https://twitter.com/danieljpgo"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 transition-colors duration-300 hover:text-gray-400 active:text-gray-300"
          >
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a
            aria-label="Linkedin"
            href="https://www.linkedin.com/in/danieljpgo/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 transition-colors duration-300 hover:text-gray-400 active:text-gray-300"
          >
            <LinkedinIcon />
          </a>
        </li>
      </ul>

      {/* <div>
        <Heading
          as="h2"
          size="xl"
          weight="semibold"
          leading="tight"
          color="darker"
        >
          Notes
        </Heading>
        <div className="mt-2">
          <Text color="base">
            Loose, short form thoughts, reflections and ideas.
          </Text>
        </div>
        <hr className="mt-4 py-2" />
        <ul className="grid gap-4">
          {notes.map((note) => (
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
                    {formatDate(note.date)}
                  </Text>
                </div>
              </article>
            </li>
          ))}
          <li>
            <Link
              href="/notes"
              className="text-gray-800 underline decoration-gray-800 underline-offset-2"
            >
              more
            </Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

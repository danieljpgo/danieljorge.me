import Link from "next/link";
import Image from "next/image";
import profile from "~/public/profile.png";
import { messages } from "~/lib/content";
import { notes, crafts } from "~/lib/contentlayer";
import {
  GithubIcon,
  Heading,
  LinkedinIcon,
  Text,
  TwitterIcon,
  View,
} from "~/components";

export default function Home() {
  return (
    <>
      <section className="grid gap-8 md:px-10">
        <div className="flex gap-4">
          <Image
            quality={100}
            src={profile}
            height={72}
            width={72}
            priority
            placeholder="blur"
            alt="Daniel Jorge profile picture"
            className="h-[72px] w-[72px] rounded-full"
          />
          <div className="flex flex-col gap-2 self-center">
            <h1 className="text-lg font-medium leading-4 text-gray-800 antialiased">
              Daniel Jorge
            </h1>
            <p className="text-base font-medium leading-4 text-slate-500 antialiased">
              Frontend Engineer
            </p>
          </div>
        </div>
        <Text>
          Engineer interested in Web, React, Design System, and TypeScript,
          currently working at{" "}
          <a
            href="https://bitso.com/"
            target="_blank"
            rel="noreferrer"
            className="font-normal text-gray-800 underline decoration-gray-800 underline-offset-2 transition-colors duration-200 hover:text-gray-500 hover:decoration-gray-500 active:text-gray-400 active:decoration-gray-400"
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
              className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
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
              className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
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
              className="text-gray-700 transition-colors duration-200 hover:text-gray-400 active:text-gray-300"
            >
              <LinkedinIcon />
            </a>
          </li>
        </ul>
      </section>
      {/* <section className="grid gap-4 md:px-10">
        <div className="grid gap-2">
          <Heading
            as="h2"
            size="xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            Writing
          </Heading>
          <Text color="base">Crafted, long form thoughts and ideas.</Text>
        </div>
        <hr />
        <ul className="grid gap-4">
          <li>
            <Text size="sm" color="light">
              Soon ...
            </Text>
          </li>
        </ul>
      </section> */}
      <section className="grid gap-4 md:px-10">
        <div className="grid gap-2">
          <Heading
            as="h2"
            size="xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {messages.notes.title}
          </Heading>
          <Text color="base">{messages.notes.description}</Text>
        </div>
        <hr />
        <ul className="grid gap-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <article className="grid gap-1">
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
                <div className="flex gap-2">
                  <Text size="sm" color="light">
                    {note.publishedAtFormatted}
                  </Text>
                  <Text size="sm" color="light">
                    •
                  </Text>
                  <Text size="sm" color="light">
                    <View slug={note.slug} type="view" /> views
                  </Text>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-4 md:px-10">
        <div className="grid gap-2">
          <Heading
            as="h2"
            size="xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            {messages.crafts.title}
          </Heading>
          <Text color="base">{messages.crafts.description}</Text>
        </div>
        <hr />
        <ul className="grid gap-4">
          {crafts.map((craft) => (
            <li key={craft.slug}>
              <article className="grid gap-1">
                <Link href={craft._raw.flattenedPath}>
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    {craft.title}
                  </Heading>
                </Link>
                <div className="flex gap-2">
                  <Text size="sm" color="light">
                    {craft.createdAtFormatted}
                  </Text>
                  <Text size="sm" color="light">
                    •
                  </Text>
                  <Text size="sm" color="light">
                    <View slug={craft.slug} type="view" /> views
                  </Text>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 md:px-10">
        <div className="grid gap-2">
          <Heading
            as="h2"
            size="xl"
            weight="semibold"
            leading="tight"
            color="darker"
          >
            More
          </Heading>
          <Text color="base">A collection of items I would like to share.</Text>
        </div>
        <hr />
        <ul className="grid gap-4">
          <li>
            <article className="grid gap-1">
              <Link href="/diagrams">
                <Heading
                  as="h3"
                  size="base"
                  weight="medium"
                  leading="tight"
                  color="darker"
                >
                  {messages.diagrams.title}
                </Heading>
              </Link>
              <div className="flex gap-2">
                <Text size="sm" color="light">
                  {messages.diagrams.description}
                </Text>
              </div>
            </article>
          </li>
        </ul>
        <ul className="grid gap-4">
          <li>
            <article className="grid gap-1">
              <Link href="/configs">
                <Heading
                  as="h3"
                  size="base"
                  weight="medium"
                  leading="tight"
                  color="darker"
                >
                  {messages.configs.title}
                </Heading>
              </Link>
              <div className="flex gap-2">
                <Text size="sm" color="light">
                  {messages.configs.description}
                </Text>
              </div>
            </article>
          </li>
        </ul>
      </section>
    </>
  );
}

/* <li>
            <article className="grid gap-1">
              <Link href={"#"}>
                <Heading
                  as="h3"
                  size="base"
                  weight="medium"
                  leading="tight"
                  color="darker"
                >
                  Toolbelt
                </Heading>
              </Link>
              <div className="flex gap-2">
              <Text size="sm" color="light">
                  2023
                </Text>
                <Text size="sm" color="light">
                  •
                </Text>
              <Text size="sm" color="light">
                An set components, customizable, opinionated with carefully
                crafted APIs.
              </Text>
              </div>
            </article>
          </li> */

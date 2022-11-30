import Image from "next/image";
import Link from "next/link";
import profile from "../../public/profile.jpeg";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  Text,
  Heading,
} from "../components";

export default function Home() {
  return (
    <main className="mx-auto grid max-w-2xl gap-8 px-10  pt-16 pb-4">
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

      <div>
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
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/notes/slug">
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    Lorem ipsum dolor dolor dolor
                  </Heading>
                </Link>
                <Text size="sm" color="light">
                  January 2, 2022
                </Text>
              </div>
            </article>
          </li>
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/notes/slug">
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    Lorem ipsum dolor
                  </Heading>
                </Link>
                <Text size="sm" color="light">
                  January 2, 2022
                </Text>
              </div>
            </article>
          </li>
          <li>
            <Link
              href="/notes"
              className="text-gray-800 underline decoration-gray-800 underline-offset-2"
            >
              More
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

/* <div>
        <Heading
          as="h2"
          size="xl"
          weight="semibold"
          leading="tight"
          color="darker"
        >
          Writing
        </Heading>
        <div className="mt-2">
          <Text color="base">Crafted, long form thoughts and ideas.</Text>
        </div>
        <hr className="mt-4 py-2" />
        <ul className="grid gap-4">
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    Lorem ipsum dolor dolor dolor
                  </Heading>
                </Link>
                <Text size="sm" color="light">
                  January 2, 2022
                </Text>
              </div>
            </article>
          </li>
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <Heading
                    as="h3"
                    size="base"
                    weight="medium"
                    leading="tight"
                    color="darker"
                  >
                    Lorem ipsum dolor
                  </Heading>
                </Link>
                <Text size="sm" color="light">
                  January 2, 2022
                </Text>{" "}
              </div>
            </article>
          </li>
          <li>
            <Link
              href="/writing"
              className="text-gray-800 underline decoration-gray-800 underline-offset-2"
            >
              More
            </Link>
          </li>
        </ul>
      </div> */

import Image from "next/image";
import Link from "next/link";
import profile from "../../public/profile.jpeg";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../components/icons";

export default function Home() {
  return (
    // <main className="mx-auto grid max-w-md gap-8 px-10 pt-16 pb-4">
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
      <p className="text-base font-normal text-gray-700 antialiased">
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
      </p>

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
        <h2 className="text-xl font-semibold leading-tight">Writing</h2>
        <p className="mt-2 text-gray-700">
          Crafted, long form thoughts and ideas.
          {/* Crafted, long form narrative and thoughts. */}
        </p>
        <hr className="mt-4 py-2" />
        <ul className="grid gap-4">
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <h2 className="text-base font-medium leading-tight">
                    {/* <h2 className="max-w-[90%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl"> */}
                    Lorem ipsum dolor dolor dolor
                  </h2>
                </Link>
                <p className="text-sm text-slate-600">January 2, 2022</p>
              </div>
            </article>
          </li>
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <h2 className="text-base font-medium leading-tight">
                    Lorem ipsum dolor
                  </h2>
                </Link>
                <p className="text-sm text-slate-600">January 2, 2022</p>
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
      </div>

      <div>
        <h2 className="text-xl font-semibold leading-tight">Notes</h2>
        <p className="mt-2 text-gray-700">
          Loose, short form thoughts, reflections and ideas.
          {/* A collection of my reflections, ideas and thoughts in short form. */}
          {/* Reflections, thoughts, ideas and loose notes that can grow overtime. */}
          {/* Loose, unopinionated notes on things I don’t entirely understand yet. */}
        </p>
        <hr className="mt-4 py-2" />
        <ul className="grid gap-4">
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <h2 className="text-base font-medium leading-tight">
                    {/* <h2 className="max-w-[90%] text-2xl font-bold leading-normal sm:text-3xl md:text-3xl"> */}
                    Lorem ipsum dolor dolor dolor
                  </h2>
                </Link>
                <p className="text-sm text-slate-600">January 2, 2022</p>
              </div>
            </article>
          </li>
          <li>
            <article className="grid gap-4">
              <div className="grid gap-1">
                <Link href="/writing/slug">
                  <h2 className="text-base font-medium leading-tight">
                    Lorem ipsum dolor
                  </h2>
                </Link>
                <p className="text-sm text-slate-600">January 2, 2022</p>
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
      </div>
    </main>
  );
}

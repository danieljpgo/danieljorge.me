import Head from "next/head";
import Image from "next/image";
import profile from "../../public/profile.jpeg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Daniel Jorge</title>
        <meta name="description" content="My corner on the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid max-w-md gap-8 px-6 pt-16 pb-4 mx-auto">
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
          <div className="flex flex-col self-center gap-2">
            <h1 className="text-lg antialiased font-medium leading-4 text-gray-800">
              Daniel Jorge
            </h1>
            <p className="text-base antialiased font-medium leading-4 text-gray-400">
              Frontend Engineer
            </p>
          </div>
        </div>
        <p className="text-base antialiased font-normal text-gray-700">
          Engineer interested at FP, React, Design System and TypeScript,
          currently working at{" "}
          <a
            href="https://bitso.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-800 underline underline-offset-2 decoration-gray-800"
          >
            Bitso
          </a>
          .
        </p>
      </main>
    </>
  );
}

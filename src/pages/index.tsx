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
      <main className="mx-auto grid max-w-md gap-8 px-6 pt-16 pb-4">
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
            <p className="text-base font-medium leading-4 text-gray-400 antialiased">
              Frontend Engineer
            </p>
          </div>
        </div>
        <p className="text-base font-normal text-gray-700 antialiased">
          Engineer interested at FP, React, Design System and TypeScript,
          currently working at{" "}
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
      </main>
    </>
  );
}

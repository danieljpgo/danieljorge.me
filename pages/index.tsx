import Head from "next/head";
import Image from "next/image";
import profile from "../public/profile.jpeg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Daniel Jorge</title>
        <meta name="description" content="My corner on the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image
          priority
          quality={100}
          src={profile}
          height={144}
          width={144}
          alt="Daniel Jorge"
        />
        <h1>Daniel Jorge</h1>
        <p>Frontend Engineer, React, FP, Design System, TS/JS</p>
      </main>
    </>
  );
}

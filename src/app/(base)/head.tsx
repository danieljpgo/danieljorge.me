import { HeadTags } from "~/components";

export default function Head() {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? "";

  return (
    <>
      <title>Daniel Jorge</title>
      <meta name="description" content="My corner on the web" />
      <head>
        <meta
          property="og:image"
          content={`${url}/api/og?title=teste og image`}
        />
      </head>
      <HeadTags />
    </>
  );
}

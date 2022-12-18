import { HeadTags } from "~/components";

export default function Head() {
  const domain = process.env.VERCEL_URL || "";
  const url = `${
    process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : ""
  }/api/vercel`;

  return (
    <>
      <title>Daniel Jorge</title>
      <meta name="description" content="My corner on the web" />
      <meta
        property="og:image"
        content={`${url}/api/og?title=teste og image`}
      />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={`${url}/api/og?title=teste og image`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="teste og image" />
      <meta
        property="og:description"
        content="An open source application built using the new router, server components and everything new in Next.js 13.es "
      />
      <meta
        property="og:image"
        content={`${url}/api/og?title=teste og image`}
      />

      {/* <!-- Twitter Meta Tags --/> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta
        property="twitter:url"
        content={`${url}/api/og?title=teste og image`}
      />
      <meta name="twitter:title" content="teste og image" />
      <meta
        name="twitter:description"
        content="An open source application built using the new router, server components and everything new in Next.js 13.es "
      />
      <meta
        name="twitter:image"
        content={`${url}/api/og?title=teste og image`}
      />

      <HeadTags />
    </>
  );
}

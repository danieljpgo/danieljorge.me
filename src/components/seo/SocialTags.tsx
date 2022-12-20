type SocialTags = {
  title: string;
  description: string;
};

// @TODO voltar aqui
export default function SocialTags(props: SocialTags) {
  const { description = "", title = "" } = props;
  const type = "website";
  const url =
    process.env.NODE_ENV === "development"
      ? ""
      : `https://${process.env.VERCEL_URL}`;
  const image = `${url}/api/og?title=${title}&description=${description}`;
  const domain =
    process.env.NODE_ENV === "development" ? "" : process.env.VERCEL_URL;

  console.log(process.env.NODE_ENV === "development");

  return (
    <>
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="830" />
      <meta property="og:site_name" content="Daniel Jorge" />
      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Daniel Jorge" />
      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@danieljpgo" />
    </>
  );
}

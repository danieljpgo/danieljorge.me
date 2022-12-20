import { HeadTags, SocialTags } from "~/components";

export default function Head() {
  const title = "Daniel Jorge";
  const description = "My corner on the web";
  const ogdescription = "Frontend Engineer at Bitso";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <SocialTags description={ogdescription} title={title} />
      <HeadTags />
    </>
  );
}

// example
// Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.

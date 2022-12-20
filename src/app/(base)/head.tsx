import { HeadTags, SocialTags } from "~/components";

export default function Head() {
  const title = "Daniel_Jorge";
  const description = "My_corner_on_the_web";
  const ogdescription = "Frontend_Engineer_at_Bitso";

  return (
    <>
      <HeadTags />
      <title>{title}</title>
      <meta name="description" content={description} />
      <SocialTags description={ogdescription} title={title} />
    </>
  );
}

// example
// Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.

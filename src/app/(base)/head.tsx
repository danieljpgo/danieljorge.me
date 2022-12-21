import { HeadTags, OGTags } from "~/components";

// ABCDE · ABCDE

export default function Head() {
  const title = "Daniel Jorge";
  const description = "My corner on the web"; // @TODO Atualizar aqui
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <HeadTags />
      <OGTags type="home" title={title} description="Frontend Engineer" />
    </>
  );
}

// example
// Welcome to my digital garden where I share what I'm learning about shipping great products, becoming a better developer and growing a career in tech.

import { HeadTags, OGTags } from "~/components";

export default function Head() {
  const title = "Daniel Jorge";
  const description = "Developer, writer.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <HeadTags />
      <OGTags type="home" title={title} description="Frontend Engineer" />
    </>
  );
}

// @TODO: melhorar implementação do <Head/>

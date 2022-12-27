import { HeadTags, OGTags } from "~/components";

export default function Head() {
  const title = "Notes";
  const description = "Loose, short form thoughts, reflections and ideas.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <HeadTags />
      <OGTags type="content" title={title} description={description} />
    </>
  );
}

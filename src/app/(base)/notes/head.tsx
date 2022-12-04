import { HeadTags } from "~/components";

export default function Head() {
  return (
    <>
      <title>Notes</title>
      <meta
        name="description"
        content="Loose, short form thoughts, reflections and ideas."
      />
      <HeadTags />
    </>
  );
}
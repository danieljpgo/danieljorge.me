import { HeadTags } from "~/components";

export default function Head(props: { params: { slug: Array<string> } }) {
  return (
    <>
      <title>{props.params.slug[0]}</title>
      <meta name="description" content="Lorem Ipsum" />
      <HeadTags />
    </>
  );
}

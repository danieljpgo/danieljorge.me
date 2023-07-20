import { ViewCounter } from "~/components";

type ViewProps = {
  type: "counter" | "view";
  slug: string;
};

export async function View({ type, slug }: ViewProps) {
  const view = await fetch(`https://danieljorge.me/api/views/${slug}`).then(
    (response) => response.json(),
  );

  return (
    <ViewCounter slug={slug} type={type} initialValue={view?.count ?? 0} />
  );
}

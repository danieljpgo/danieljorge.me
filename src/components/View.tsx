import { ViewCounter } from "~/components";

type ViewProps = {
  type: "counter" | "view";
  slug: string;
};

export default async function View({ type, slug }: ViewProps) {
  const view = await fetch(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/views/${slug}`
      : `http://localhost:3000/api/views/${slug}`,
  ).then((response) => response.json());

  return (
    <ViewCounter slug={slug} type={type} initialValue={view?.count ?? 0} />
  );
}

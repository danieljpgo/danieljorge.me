import { Metadata } from "next";
import { notFound } from "next/navigation";
import { documents } from "~/lib/contentlayer";
import { genericMetadata } from "~/lib/metadata";

type ContentProps = {
  params: { type: string; slug: string };
};
export default function Content({ params }: ContentProps) {
  const content = documents.find((doc) => doc.slug === params.slug);

  if (!content) {
    notFound();
  }
  return <div>JSX</div>;
}

export function generateStaticParams(): Array<ContentProps["params"]> {
  return documents.map((doc) => ({
    type: doc._raw.sourceFileDir,
    slug: doc.slug,
  }));
}

export function generateMetadata({ params }: ContentProps): Metadata {
  const content = documents.find((doc) => doc.slug === params.slug);
  if (!content) return notFound();

  const metadata = {
    title: content.title,
    description: content.description,
  };

  const og = new URLSearchParams({
    title: metadata.title,
    description: metadata.description,
    type: "content",
  }).toString();

  return {
    title: metadata.title,
    description: metadata.description,
    twitter: {
      ...genericMetadata.twitter,
      title: metadata.title,
      description: metadata.description,
      images: {
        ...genericMetadata.twitter.images,
        url: `${baseURL}/api/og?${og}`,
        alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
      },
    },
    openGraph: {
      ...genericMetadata.openGraph,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          ...genericMetadata.openGraph.images[0],
          url: `${baseURL}/api/og?${og}`,
          alt: `Banner with title "${metadata.title}" and description "${metadata.description}"`,
        },
      ],
    },
  };
}

const baseURL = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

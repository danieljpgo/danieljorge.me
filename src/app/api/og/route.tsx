/* eslint-disable @next/next/no-img-element */
import type { ImageResponseOptions, NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { cn } from "~/lib/tailwindcss";
import { documents } from "~/lib/contentlayer";
import { formatDateNumerical } from "~/lib/date";
import { OG, documentCategoryMap, messages } from "~/lib/content";

const fonts = Promise.all([
  fetch(
    new URL("../../../../public/fonts/Manrope-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
  fetch(
    new URL("../../../../public/fonts/Manrope-Medium.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
]);

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const og = {
    type: searchParams.get("type") as (typeof OG)[keyof typeof OG], // TODO REMOVE as
    category: searchParams.get("category"),
    slug: searchParams.get("slug"),
    topic: searchParams.get("topic"),
  };

  if (!og.type || !Object.values(OG).includes(og.type)) {
    return new Response("Missing type search params", { status: 500 });
  }

  const [fontRegular, fontMedium] = await fonts;
  const config = {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: fontMedium, weight: 500, style: "normal" },
      { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
    ],
  } satisfies ImageResponseOptions;

  try {
    if (og.type === OG.HOME) {
      return new ImageResponse(<Home origin={req.nextUrl.origin} />, config);
    }
    if (og.type === OG.CONTENT) {
      const content = documents.find((doc) => doc.slug === og.slug);
      if (!content) {
        return Response.json("Slug doesn't exist", { status: 404 });
      }

      return new ImageResponse(
        (
          <Content
            title={content.title}
            description={content.description}
            origin={req.nextUrl.origin}
          />
        ),
        config,
      );
    }
    if (og.type === OG.CONTENT_IMAGE) {
      const content = documents.find((doc) => doc.slug === og.slug);
      if (!content || content.type !== "Crafts") {
        return Response.json("Slug doesn't exist", { status: 404 });
      }

      return new ImageResponse(
        (
          <ContentImage
            title={content.title}
            description={content.description}
            origin={req.nextUrl.origin}
            og={content.og}
          />
        ),
        config,
      );
    }
    if (og.type === OG.CONTENT_AUTO_IMAGES) {
      const content = documents.find((doc) => doc.slug === og.slug);
      if (!content || content.type !== "Diagrams") {
        return Response.json("Slug doesn't exist", { status: 404 });
      }
      return new ImageResponse(
        (
          <Diagram
            title={content.title}
            origin={req.nextUrl.origin}
            images={content.images}
          />
        ),
        config,
      );
    }
    if (og.type === OG.INDEX) {
      if (og.topic) {
        const contents = documents.filter((doc) =>
          doc.topics.includes(og.topic),
        );
        if (!contents.length) {
          return Response.json("Slug doesn't exist", { status: 404 });
        }
        return new ImageResponse(
          (
            <List
              title={`${messages[og.topic]}`}
              description={`Writings, notes, diagrams and more related to ${messages[og.topic]}`}
              origin={req.nextUrl.origin}
              items={contents
                .map(
                  (content) =>
                    `${formatDateNumerical(
                      "createdAt" in content
                        ? content.createdAt
                        : content.publishedAt,
                    )};${content.title}`,
                )
                .slice(0, 10)}
            />
          ),
          config,
        );
      }
      if (!og.category) {
        return Response.json("Category doesn't exist", { status: 404 });
      }
      const contents = documents.filter(
        (doc) => documentCategoryMap[doc.type] === og.category,
      );
      if (!contents.length) {
        return Response.json("Contents doesn't exist", { status: 404 });
      }

      return new ImageResponse(
        (
          <List
            title={messages[documentCategoryMap[contents[0].type]].title}
            description={
              messages[documentCategoryMap[contents[0].type]].description
            }
            origin={req.nextUrl.origin}
            items={contents
              .map(
                (content) =>
                  `${formatDateNumerical(
                    "createdAt" in content
                      ? content.createdAt
                      : content.publishedAt,
                  )};${content.title}`,
              )
              .slice(0, 10)}
          />
        ),
        config,
      );
    }
    return new ImageResponse(<Home origin={req.nextUrl.origin} />, config);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
function Home({ origin }: { origin: string }) {
  return (
    <Layout>
      <Header origin={origin} />
      <div tw="flex items-center">
        <img
          src={`${origin}/profile.png`}
          tw="rounded-full h-20"
          alt="profile"
        />
        <div tw="flex flex-col pl-4">
          <span tw="flex text-4xl text-gray-800 mb-6 leading-4 font-medium">
            Daniel Jorge
          </span>
          <span tw="flex text-3xl text-slate-500 leading-4 font-normal">
            Frontend Engineer at Bitso
          </span>
        </div>
      </div>
    </Layout>
  );
}
function Content({
  title,
  description,
  origin,
}: {
  title: string;
  description: string;
  origin: string;
}) {
  return (
    <Layout>
      <Header origin={origin} />
      <main tw="flex flex-col">
        <div tw="flex mb-2.5">
          <Title>{title}</Title>
        </div>
        <div tw="flex">
          <Description>{description}</Description>
        </div>
      </main>
      <Footer origin={origin} />
    </Layout>
  );
}
function ContentImage({
  title,
  description,
  origin,
  og,
}: {
  title: string;
  description: string;
  origin: string;
  og: string;
}) {
  return (
    <Panel>
      <Section>
        <Header origin={origin} />
        <main tw="flex flex-col">
          <div tw="flex mb-2.5">
            <Title>{title}</Title>
          </div>
          <div tw="flex">
            <Description>{description}</Description>
          </div>
        </main>
        <Footer origin={origin} />
      </Section>
      <Aside>
        <div tw="flex flex-col-reverse relative self-center justify-center">
          <img src={`${origin}${og}`} alt="diagram" tw="w-200 absolute" />
        </div>
      </Aside>
    </Panel>
  );
}
function List({
  title,
  description,
  origin,
  items,
}: {
  title: string;
  description: string;
  origin: string;
  items: Array<string>;
}) {
  // TODO fix here
  const content = items.map((item) => item.split(";")).slice(0, 10);
  return (
    <Panel>
      <Section>
        <Header origin={origin} />
        <main tw="flex w-140 pr-10 items-center">
          <div tw="flex flex-col">
            <div tw="flex mb-2.5">
              <Title>{title}</Title>
            </div>
            <div tw="flex">
              <Description>{description}</Description>
            </div>
          </div>
        </main>
        <Footer origin={origin} />
      </Section>
      <Aside>
        <ul
          tw={cn(
            "flex flex-col self-center justify-center border-t border-gray-300 w-134",
            content.length > 8 && "absolute top-0",
          )}
        >
          {content.map(([data, post]) => (
            <li
              key={post}
              tw="flex py-4 text-xl border-gray-300 border-b w-full items-center"
            >
              <small tw="flex text-gray-400 text-lg">{data}</small>
              <p tw="pl-4 flex m-0">{post}</p>
              {/* <p tw="flex m-0 text-gray-400 pl-7">{"11"}</p> */}
            </li>
          ))}
        </ul>
      </Aside>
    </Panel>
  );
}
function Diagram({
  title,
  origin,
  images,
}: {
  title: string;
  origin: string;
  images: Array<string>;
}) {
  return (
    <Panel>
      <Section>
        <Header origin={origin} />
        <main tw="flex w-full">
          <div tw="flex w-140 pr-10">
            <Title>{title}</Title>
          </div>
        </main>
        <Footer origin={origin} />
      </Section>
      <Aside>
        <div tw="flex flex-col-reverse relative self-center justify-center">
          {images.map((image, i) => (
            <img
              key={i}
              src={`${origin}${image}`}
              alt="diagram"
              tw="w-200 absolute"
              style={{ left: (images.length - i) * 60 }}
            />
          ))}
        </div>
      </Aside>
    </Panel>
  );
}
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      tw="flex flex-col w-full h-full bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      {children}
    </div>
  );
}
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      tw="flex w-full h-full bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      {children}
    </div>
  );
}
function Section({ children }: { children: React.ReactNode }) {
  return (
    <section tw="h-full justify-between flex flex-col w-140">
      {children}
    </section>
  );
}
function Aside({ children }: { children: React.ReactNode }) {
  return <aside tw="w-full h-full flex">{children}</aside>;
}
function Header({ origin }: { origin: string }) {
  return (
    <header tw="flex items-center">
      <img src={`${origin}/logo.svg`} tw="h-6 w-6" alt="logo" />
      <p tw="m-0 -mt-0.5 pl-2 text-xl font-normal">danieljorge.me</p>
    </header>
  );
}
function Footer({ origin }: { origin: string }) {
  return (
    <footer tw="flex items-center">
      <img src={`${origin}/profile.png`} tw="rounded-full h-18" alt="profile" />
      <div tw="flex flex-col pl-4">
        <h2 tw="m-0 flex text-3xl text-gray-800 mb-4 leading-4 font-medium">
          Daniel Jorge
        </h2>
        <p tw="m-0 flex text-2xl text-slate-500 leading-4 font-normal">
          Frontend Engineer
        </p>
      </div>
    </footer>
  );
}
function Title({ children }: { children: string }) {
  return (
    <h1
      tw="m-0 text-5xl text-gray-800 font-medium"
      style={{ letterSpacing: "-0.05em" }}
    >
      {children}
    </h1>
  );
}
function Description({ children }: { children: string }) {
  return (
    <p
      tw="m-0 flex text-4xl text-slate-500 font-normal"
      style={{ letterSpacing: "-0.05em" }}
    >
      {children}
    </p>
  );
}

// @TODO add protection

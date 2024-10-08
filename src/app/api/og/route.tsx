/* eslint-disable @next/next/no-img-element */
import type { ImageResponseOptions, NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { cn } from "~/lib/tailwindcss";
import { documents, topics } from "~/lib/contentlayer";
import { formatDateNumerical } from "~/lib/date";
import {
  OG,
  messages,
  validateOG,
  validatePage,
  validateTopic,
  validateCategory,
  TOPIC,
} from "~/lib/content";

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
  const [fontRegular, fontMedium] = await fonts;
  const og = {
    slug: searchParams.get("slug"),
    type: validateOG(searchParams.get("type")),
    page: validatePage(searchParams.get("page")),
    topic: validateTopic(searchParams.get("topic")),
    category: validateCategory(searchParams.get("category")),
  };
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
    if (og.type === OG.INDEX && og.page === "topics") {
      return new ImageResponse(
        (
          <ListBasic
            title={messages[og.page].title}
            description={messages[og.page].description}
            origin={req.nextUrl.origin}
            items={Object.values(TOPIC)
              .map((topic) => ({
                title: messages[topic],
                amount: topics[topic],
              }))
              .slice(0, 10)}
          />
        ),
        config,
      );
    }
    if (og.type === OG.INDEX && og.topic) {
      const contents = documents.filter(
        (doc) => og.topic && doc.topics.includes(og.topic),
      );
      if (!contents.length) {
        return Response.json("Topic doesn't exit", { status: 404 });
      }
      return new ImageResponse(
        (
          <List
            title={`${messages[og.topic]}`}
            description={`Writings, notes, diagrams and more related to ${messages[og.topic]}`}
            origin={req.nextUrl.origin}
            items={contents
              .map((content) => ({
                title: content.title,
                date:
                  "createdAt" in content
                    ? content.createdAt
                    : content.publishedAt,
              }))
              .slice(0, 10)}
          />
        ),
        config,
      );
    }
    if (og.type === OG.INDEX && og.category) {
      const contents = documents.filter(
        (doc) => og.category && doc.category.includes(og.category),
      );
      if (!contents.length) {
        return Response.json("Category doesn't exit", { status: 404 });
      }
      return new ImageResponse(
        (
          <List
            title={messages[contents[0].type].title}
            description={messages[contents[0].type].description}
            origin={req.nextUrl.origin}
            items={contents
              .map((content) => ({
                title: content.title,
                date:
                  "createdAt" in content
                    ? content.createdAt
                    : content.publishedAt,
              }))
              .slice(0, 10)}
          />
        ),
        config,
      );
    }
    if (og.type === OG.CONTENT && og.slug) {
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
    if (og.type === OG.CONTENT_IMAGE && og.slug) {
      const content = documents.find((doc) => doc.slug === og.slug);
      if (!content || !("og" in content)) {
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
    if (og.type === OG.CONTENT_AUTO_IMAGES && og.slug) {
      const content = documents.find((doc) => doc.slug === og.slug);
      if (!content || !("images" in content)) {
        return Response.json("Slug doesn't exist", { status: 404 });
      }
      return new ImageResponse(
        (
          <ContentAutoImage
            title={content.title}
            origin={req.nextUrl.origin}
            images={content.images}
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
    return new Response(`Failed to generate the image`, { status: 500 });
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
  items: Array<{ title: string; date: string }>;
}) {
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
            items.length > 8 && "absolute top-0",
          )}
        >
          {items.map((item) => (
            <li
              key={item.title}
              tw="flex py-4 text-xl border-gray-300 border-b w-full items-center"
            >
              <small tw="flex text-gray-400 text-lg">
                {formatDateNumerical(item.date)}
              </small>
              <p tw="pl-4 flex m-0">{item.title}</p>
              {/* <p tw="flex m-0 text-gray-400 pl-7">{"11"}</p> */}
            </li>
          ))}
        </ul>
      </Aside>
    </Panel>
  );
}

function ContentAutoImage({
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

// @TODO: improve og list component
function ListBasic({
  title,
  description,
  origin,
  items,
}: {
  title: string;
  description: string;
  origin: string;
  items: Array<{ title: string; amount: number }>;
}) {
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
            items.length > 8 && "absolute top-0",
          )}
        >
          {items.map((item) => (
            <li
              key={item.title}
              tw="flex py-4 text-xl border-gray-300 border-b w-full items-center"
            >
              <p tw="pl-3 flex m-0">{item.title}</p>
              <small tw="flex pl-1.5 text-gray-400 text-lg">•</small>
              <small tw="flex pl-1.5 text-gray-400 text-lg">
                ({item.amount})
              </small>
            </li>
          ))}
        </ul>
      </Aside>
    </Panel>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

const fonts = Promise.all([
  fetch(
    new URL("../../../../public/fonts/Inter-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
  fetch(
    new URL("../../../../public/fonts/Inter-Medium.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
]);

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type")?.slice(0, 120) ?? "None";
  const title = searchParams.get("title")?.slice(0, 80) ?? "None";
  const description = searchParams.get("description")?.slice(0, 120) ?? "None";
  const images = searchParams.get("images") ?? "None";

  // console.log(images);

  const [fontRegular, fontMedium] = await fonts;

  try {
    return new ImageResponse(
      (() => {
        if (type === "home") {
          return <Home origin={req.nextUrl.origin} />;
        }
        if (type === "content") {
          return (
            <Content
              title={title}
              description={description}
              origin={req.nextUrl.origin}
            />
          );
        }
        if (type === "diagram") {
          return (
            <Diagram
              title={title}
              origin={req.nextUrl.origin}
              images={images}
            />
          );
        }

        return <Home origin={req.nextUrl.origin} />;
      })(),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontMedium,
            weight: 500,
            style: "normal",
          },
          {
            name: "Inter",
            data: fontRegular,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
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
      <div tw="flex flex-col">
        <div tw="flex mb-2.5">
          <Title>{title}</Title>
        </div>
        <div tw="flex text-center">
          <Description>{description}</Description>
        </div>
      </div>
      <Footer origin={origin} />
    </Layout>
  );
}

function Diagram({
  title,
  origin,
  images,
}: {
  title: string;
  origin: string;
  images: string;
}) {
  return (
    <Layout>
      <Header origin={origin} />
      <Main>
        <div tw="flex w-140 pr-10">
          <Title>{title}</Title>
        </div>
        <div tw="flex flex-col relative">
          {images
            .split(",")
            .sort(() => -1)
            .map(
              (image, i) =>
                console.log(image) || (
                  <img
                    key={i}
                    src={`${origin}${image}`}
                    // src={`${origin}/content/diagrams/url-as-a-way-to-compose-your-interface/4.png`}
                    alt="diagram"
                    tw="w-200 absolute" //left-30
                    style={{ left: i * -20, top: -100 * i }}
                    // style={{ top: i * -20 + -160 }}
                    // style={{ top: -160 }}
                  />
                ),
            )}
          {/* <img
            src={`${origin}/content/diagrams/url-as-a-way-to-compose-your-interface/3.png`}
            tw="w-200 absolute left-20"
            style={{ top: -260 }}
            alt="diagram"
          />
          <img
            src={`${origin}/content/diagrams/url-as-a-way-to-compose-your-interface/2.png`}
            tw="w-200 absolute left-10"
            style={{ top: -200 }}
            alt="diagram"
          />
          <img
            src={`${origin}/content/diagrams/url-as-a-way-to-compose-your-interface/1.png`}
            tw="w-200 absolute"
            style={{ top: -244 }}
            alt="diagram"
          /> */}
        </div>
      </Main>
      <Footer origin={origin} />
    </Layout>
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

function Header({ origin }: { origin: string }) {
  return (
    <div tw="flex items-center">
      <img src={`${origin}/logo.svg`} tw="h-6 w-6" alt="logo" />
      <span tw="pl-2 text-xl font-normal">danieljorge.me</span>
    </div>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <div tw="flex">{children}</div>;
}

function Footer({ origin }: { origin: string }) {
  return (
    <div tw="flex items-center">
      <img src={`${origin}/profile.png`} tw="rounded-full h-18" alt="profile" />
      <div tw="flex flex-col pl-4">
        <span tw="flex text-3xl text-gray-800 mb-4 leading-4 font-medium">
          Daniel Jorge
        </span>
        <span tw="flex text-2xl text-slate-500 leading-4 font-normal">
          Frontend Engineer
        </span>
      </div>
    </div>
  );
}

function Title({ children }: { children: string }) {
  return (
    <span
      tw="text-5xl text-gray-800 font-medium"
      style={{ letterSpacing: "-0.05em" }}
    >
      {children}
    </span>
  );
}

function Description({ children }: { children: string }) {
  return (
    <span
      tw="flex text-4xl text-slate-500 font-normal"
      style={{
        letterSpacing: "-0.05em",
      }}
    >
      {children}
    </span>
  );
}

// @TODO add protection

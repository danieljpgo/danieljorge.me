import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = { runtime: "experimental-edge" };

const fonts = Promise.all([
  fetch(new URL("../../../public/Inter-Regular.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  ),
  fetch(new URL("../../../public/Inter-Medium.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  ),
  fetch(new URL("../../../public/Inter-SemiBold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  ),
  fetch(new URL("../../../public/Inter-Bold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  ),
]);

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const [fontRegular, fontMedium, fontSemibold, fontBold] = await fonts;

  const type = searchParams.get("type")?.slice(0, 120) ?? "None";
  const title = searchParams.get("title")?.slice(0, 80) ?? "None";
  const description = searchParams.get("description")?.slice(0, 120) ?? "None";

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
        return <Home origin={req.nextUrl.origin} />;
      })(),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            weight: 700,
            style: "normal",
          },
          {
            name: "Inter",
            data: fontSemibold,
            weight: 600,
            style: "normal",
          },
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

type HomeProps = {
  origin: string;
};

const Home = ({ origin }: HomeProps) => {
  return (
    <div
      tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      <div tw="flex items-center">
        <img src={`${origin}/logo.svg`} tw="h-6 w-6" alt="logo" />
        <span tw="ml-2 text-xl font-normal">danieljorge.me</span>
      </div>
      <div tw="flex items-center">
        <img
          src={`${origin}/profile.jpeg`}
          tw="rounded-full h-20"
          alt="profile"
        />
        <div tw="flex flex-col pl-4">
          <div tw="flex text-4xl text-gray-800 mb-6 leading-4 font-medium">
            Daniel Jorge
          </div>
          <div tw="flex text-3xl text-slate-500 leading-4 font-normal">
            Frontend Engineer at Bitso
          </div>
        </div>
      </div>
    </div>
  );
};

type ContentProps = {
  title: string;
  description: string;
  origin: string;
};

const Content = ({ title, description, origin }: ContentProps) => {
  return (
    <div
      tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      <div tw="flex items-center">
        <img src={`${origin}/logo.svg`} tw="h-6 w-6" alt="logo" />
        <span tw="ml-2 text-xl font-normal">danieljorge.me</span>
      </div>
      <div tw="flex flex-col items-center justify-center w-full">
        <div tw="flex text-5xl text-gray-800 text-center mb-2 font-semibold">
          {title}
        </div>
        <div tw="flex text-4xl text-slate-500 text-center font-normal">
          {description}
        </div>
      </div>
      <div tw="flex items-center">
        <img
          src={`${origin}/profile.jpeg`}
          tw="rounded-full h-20"
          alt="profile"
        />
        <div tw="flex flex-col pl-4">
          <div tw="flex text-4xl text-gray-800 mb-6 leading-4 font-medium">
            Daniel Jorge
          </div>
          <div tw="flex text-3xl text-slate-500 leading-4 font-normal">
            Frontend Engineer
          </div>
        </div>
      </div>
    </div>
  );
};
// @TODO add protection

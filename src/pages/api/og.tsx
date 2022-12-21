import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const domain = "danieljorge.me";

// @TODO add protection

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type")?.slice(0, 120) ?? "None";
  const title = searchParams.get("title")?.slice(0, 80) ?? "None";
  const description = searchParams.get("description")?.slice(0, 120) ?? "None";

  try {
    return new ImageResponse(
      (() => {
        if (type === "home") {
          return <Home />;
        }
        if (type === "content") {
          return <Content title={title} description={description} />;
        }
        if (type === "hub") {
          return <Hub title={title} description={description} />;
        }
        return <Content title={title} description={description} />;
      })(),
      {
        width: 1200,
        height: 630,
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

const Home = () => {
  return (
    <div
      tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      <div tw="flex items-center">
        <span tw="h-6 w-6 bg-black" />
        <span tw="ml-2 text-xl">{domain}</span>
      </div>
      <div tw="flex items-center">
        <img src="https://danieljorge.me/profile.jpeg" tw="rounded-full h-20" />
        <div tw="flex flex-col pl-4">
          <div tw="flex text-4xl text-gray-800 mb-6 leading-4">
            Daniel Jorge
          </div>
          <div tw="flex text-3xl text-slate-400 leading-4">
            Frontend Engineer
          </div>
        </div>
      </div>
    </div>
  );
};

type ContentProps = {
  title: string;
  description: string;
};

const Content = ({ title, description }: ContentProps) => {
  return (
    <div
      tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      <div tw="flex items-center">
        <span tw="h-6 w-6 bg-black" />
        <span tw="ml-2 text-xl">{domain}</span>
      </div>
      <div tw="flex flex-col items-center justify-center w-full">
        <div tw="flex text-5xl text-gray-800 text-center mb-2">{title}</div>
        <div tw="flex text-4xl text-slate-400 text-center">{description}</div>
      </div>
      <div tw="flex items-center">
        <img src="https://danieljorge.me/profile.jpeg" tw="rounded-full h-20" />
        <div tw="flex flex-col pl-4">
          <div tw="flex text-4xl text-gray-800 mb-6 leading-4">
            Daniel Jorge
          </div>
          <div tw="flex text-3xl text-slate-400 leading-4">
            Frontend Engineer
          </div>
        </div>
      </div>
    </div>
  );
};

type HubProps = {
  title: string;
  description: string;
};

const Hub = ({ title, description }: HubProps) => {
  return (
    <div
      tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
      style={{ letterSpacing: "-.02em" }}
    >
      <div tw="flex items-center">
        <span tw="h-6 w-6 bg-black" />
        <span tw="ml-2 text-xl">{domain}</span>
      </div>
      <div tw="flex flex-col items-center justify-center w-full">
        <div tw="flex text-5xl text-gray-800 text-center mb-2">{title}</div>
        <div tw="flex text-4xl text-slate-400 text-center">{description}</div>
      </div>
      <div tw="flex items-center">
        <img src="https://danieljorge.me/profile.jpeg" tw="rounded-full h-20" />
        <div tw="flex flex-col pl-4">
          <div tw="flex text-4xl text-gray-800 mb-6 leading-4">
            Daniel Jorge
          </div>
          <div tw="flex text-3xl text-slate-400 leading-4">
            Frontend Engineer
          </div>
        </div>
      </div>
    </div>
  );
};

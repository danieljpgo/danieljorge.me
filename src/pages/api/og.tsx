import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

// @TODO add protection
//@TODO type diferent types for og tags pages vs content
// const type = searchParams.get("type")?.slice(0, 120) ?? "None";

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = "danieljorge.me";

  const title = searchParams.get("title")?.slice(0, 80) ?? "None";
  const description = searchParams.get("description")?.slice(0, 120) ?? "None";

  try {
    return new ImageResponse(
      (
        <div
          tw="flex flex-col w-full h-full font-bold bg-white p-12 justify-between"
          style={{ letterSpacing: "-.02em" }}
        >
          <div tw="flex items-center">
            <span tw="h-6 w-6 bg-black" />
            <span tw="ml-2 text-xl">{domain}</span>
          </div>
          <div tw="flex items-center">
            <img
              src="https://danieljorge.me/profile.jpeg"
              tw="rounded-full h-18"
            />
            <div tw="flex flex-col pl-4">
              <div tw="flex text-4xl text-gray-800 mb-6 leading-4">{title}</div>
              <div tw="flex text-3xl text-slate-400 leading-4">
                {description}
              </div>
            </div>
          </div>
        </div>
      ),
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

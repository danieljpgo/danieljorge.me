import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  console.log(request.url);

  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json("Slug not informed", { status: 400 });
    }

    const post = await prisma.view.findUnique({ where: { slug } });
    if (!post) {
      return NextResponse.json("Content does not exist", { status: 400 });
    }

    return NextResponse.json({ count: post.count }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { message: error.message } },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: { message: String(error) } },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug;
    if (!slug) {
      return NextResponse.json("Slug not informed", { status: 400 });
    }

    const post = await prisma.view.upsert({
      where: { slug },
      create: { slug, count: 1 },
      update: { count: { increment: 1 } },
    });
    return NextResponse.json({ count: post.count }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: { message: error.message } },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: { message: String(error) } },
      { status: 500 },
    );
  }
}

// @TODO  zod?

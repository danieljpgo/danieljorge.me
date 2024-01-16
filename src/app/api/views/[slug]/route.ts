import type { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { views } from "~/server/schema";

export const runtime: ServerRuntime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    if (!params.slug) {
      return NextResponse.json("Slug not informed", { status: 400 });
    }
    const post = await db.query.views.findFirst({
      where: (view, { eq }) => eq(view.slug, params.slug),
    });
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
    if (!params.slug) {
      return NextResponse.json("Slug not informed", { status: 400 });
    }
    const [updated] = await db.transaction(async (tx) => {
      const post = await tx.query.views.findFirst({
        where: (view, { eq }) => eq(view.slug, params.slug),
      });
      if (!post) {
        return db
          .insert(views)
          .values({ slug: params.slug, count: 1 })
          .returning();
      }
      return db
        .update(views)
        .set({ count: post.count + 1 })
        .where(eq(views.slug, params.slug))
        .returning();
    });

    return NextResponse.json({ count: updated.count }, { status: 200 });
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

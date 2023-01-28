import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const slug = req.query.slug?.toString();
    if (!slug) throw new Error("Slug not informed");

    if (req.method === "GET") {
      const post = await prisma.view.findUnique({ where: { slug } });
      if (!post) throw new Error("Content does not exist");

      return res.status(200).json({ count: post.count });
    }

    if (req.method === "POST") {
      const post = await prisma.view.upsert({
        where: { slug },
        create: { slug, count: 1 },
        update: { count: { increment: 1 } },
      });
      return res.status(200).json({ count: post.count });
    }
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).send("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
    return res.status(500).json({ statusCode: 500, message: String(error) });
  }
}

// @TODO adicionar zod

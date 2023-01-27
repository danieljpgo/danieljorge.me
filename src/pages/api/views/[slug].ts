import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const slug = req.query.slug?.toString();

    if (!slug) {
      return res
        .status(500)
        .json({ statusCode: 500, message: "slug not informed" });
    }

    if (req.method === "GET") {
      const post = await prisma.view.findUnique({
        where: { slug },
      });
      if (!post) {
        return res
          .status(500)
          .json({ statusCode: 500, message: "slug does not exist" });
      }
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
// import { z } from "zod"

// const slug = z.string().parse(req.query.slug)

// switch (req.method) {
//   case "GET": {
//     // const post = await prisma.post.findUnique({
//     //   where: { slug },
//     // })

//     // res.json(post?.views || 1)
//     break
//   }

//   case "POST": {
//     // const post = await prisma.post.upsert({
//     //   where: { slug },
//     //   create: { slug, views: 1 },
//     //   update: { views: { increment: 1 } },
//     // })

//     // res.json(post?.views || 1)
//     break
//   }

//   default: {
//     res.setHeader("Allow", ["GET", "POST"])
//     res.status(405).send("Method Not Allowed")
//   }
// }

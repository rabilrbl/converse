import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case "GET":
      const posts = await new PrismaClient().posts.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
          thread: {
            select: {
              topic: true,
            },
          },
        },
      });
      res.status(200).json(posts);
      break;
    case "POST":
      const newPost = await new PrismaClient().posts.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          author: {
            connect: {
              id: Number.parseInt(req.body.author),
            },
          },
          thread: {
            connect: {
              id: Number.parseInt(req.body.thread),
            },
          },
        },
      });
      res.status(201).json(newPost);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

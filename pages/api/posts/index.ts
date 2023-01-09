import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      const posts = await new PrismaClient().posts.findMany({
        select: {
          id: true,
          title: true,
          author: {
            select: {
              name: true,
              image: true,
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
      const title = req.body.title;
      const content = req.body.content;
      const threadId = Number.parseInt(req.body.thread);
      const authorId = Number.parseInt(session.user.id);
      if (!title || !content || !threadId) {
        res.status(400).end({
          error: "Bad Request",
        });
        break;
      }
      if (!authorId) {
        res.status(401).end({
          error: "Unauthorized",
        });
        break;
      }
      const newPost = await new PrismaClient().posts.create({
        data: {
          title,
          content,
          authorId,
          threadId,
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

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const id = Number.parseInt(req.query.id as string);

  switch (method) {
    case "PUT":
      const updatedPost = await new PrismaClient().posts.update({
        where: {
          id: id,
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          published: req.body.published,
          threadId: req.body.thread && Number.parseInt(req.body.thread),
        },
      });
      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      const deletedPost = await new PrismaClient().posts.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(deletedPost);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth/next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const session = await unstable_getServerSession(req);
  if (!session) {
    res.status(401).end("Unauthorized");
    return;
  }
  const id = Number.parseInt(req.query.id as string);

  switch (method) {
    case "PUT":
      const updatedPost = await prisma.posts.update({
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
      const deletedPost = await prisma.posts.delete({
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

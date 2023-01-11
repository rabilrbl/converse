import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const id = Number.parseInt(req.query.id as string);

  switch (method) {
    case "PUT":
      const updatedThread = await prisma.thread.update({
        where: {
          id: id,
        },
        data: {
          topic: req.body.topic,
        },
      });
      res.status(200).json(updatedThread);
      break;
    case "DELETE":
      const deletedThread = await prisma.thread.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(deletedThread);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;

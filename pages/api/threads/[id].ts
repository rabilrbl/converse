import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const id = Number.parseInt(req.query.id as string);

  switch (method) {
    case "PUT":
      const updatedThread = await new PrismaClient().thread.update({
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
      const deletedThread = await new PrismaClient().thread.delete({
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
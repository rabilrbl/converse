import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case "GET":
      const threads = await new PrismaClient().thread.findMany();
      res.status(200).json(threads);
      break;
    case "POST":
      const newThread = await new PrismaClient().thread.create({
        data: {
          topic: req.body.topic,
        },
      });
      res.status(201).json(newThread);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
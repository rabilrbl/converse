import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case "GET":
      const threads = await prisma.thread.findMany();
      res.status(200).json(threads);
      break;
    case "POST":
      const newThread = await prisma.thread.create({
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

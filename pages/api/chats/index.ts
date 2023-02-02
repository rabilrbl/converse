import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const method = req.method;
  if (!session) {
    res.status(401).end({
      error: "Unauthorized",
    });
    return;
  }
  switch (method) {
    case "GET":
      const chats = await prisma.chat.findMany({
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          message: true,
        },
        take: 100,
      });
      res.json(
        chats.map((chat) => ({
          id: chat.id,
          user: chat.user.name,
          message: chat.message,
        }))
      );
      break;
    case "POST":
      const { message } = req.body;
      if (!message) {
        res.status(400).end({
          error: "Message is required",
        });
        return;
      }
      const chat = await prisma.chat.create({
        data: {
          message,
          userId: Number.parseInt(session.user.id),
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          message: true,
        },
      });
      chat
        ? res.json({
            id: chat.id,
            user: chat.user.name,
            message: chat.message,
          })
        : res.status(400).end({
            error: "Something went wrong",
          });
      break;
    default:
      res.status(405).end({
        error: "Method not allowed",
      });
  }
}

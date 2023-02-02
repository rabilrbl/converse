import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const session = await getSession({ req });
  if (!session) {
    return res.redirect("/api/auth/signin");
  }
  switch (method) {
    case "PUT":
      await prisma.user.update({
        where: {
          id: Number.parseInt(session.user.id),
        },
        data: {
          dob: req.body.dob ? new Date(req.body.dob) : null,
          bio: req.body.bio,
          gender: req.body.gender,
        },
      });
      return res.status(200).json({ success: true });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Handler({ req, res }) {
  const { method } = req;
  const session = await getSession({ req });
  switch (method) {
    case "PUT":
      if (!session) {
        return {
          redirect: {
            destination: "/api/auth/signin",
            permanent: false,
          },
        };
      } else {
        await prisma.user.update({
          where: {
            id: Number.parseInt(session.user.id),
          },
          data: {
            dob: new Date(req.body.dob),
          },
        });
        return res.status(200).json({ success: true });
      }
      break;
  }
}

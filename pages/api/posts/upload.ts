import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const upload = multer({ storage });

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({
      name: "Bad Request",
      message: `Use POST instead of ${req.method}`,
    });
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  upload.single("banner")(req as any, res as any, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    const postId = Number.parseInt(req.body.postId);
    const post = await prisma.posts.findUnique({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.authorId !== Number.parseInt(session.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const banner = (req as any).file;
    if (!banner) {
      return res.status(400).json({ message: "No banner provided" });
    }
    const result = await prisma.posts.update({
      where: { id: postId },
      data: {
        banner: `/uploads/${banner.filename}`,
      },
    });
    return res.status(200).json(result);
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

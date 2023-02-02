import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

const storage = multer.memoryStorage();
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

  upload.fields([{ name: "attachments", maxCount: 5 }])(
    req as any,
    res as any,
    async (err) => {
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
      const attachments = (req as any).files[
        "attachments"
      ] as Express.Multer.File[];
      if (attachments && attachments.length > 0) {
        attachments.forEach(async (attachment) => {
          const file = await prisma.file.create({
            data: {
              name: attachment.originalname || "attachment",
              type: attachment.mimetype,
              size: attachment.size,
              buffer: attachment.buffer,
            },
          });
          await prisma.uploads.create({
            data: {
              postId,
              userId: Number.parseInt(session.user.id),
              file: `${file.id}`,
            },
          });
        });
        return res.status(200).json({ message: "Attachments uploaded" });
      } else {
        return res.status(200).json({
          message: "No files were found for attachment",
        });
      }
    }
  );
}

export const config = {
  api: {
    bodyParser: false,
  },
};

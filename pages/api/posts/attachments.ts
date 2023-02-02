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

  upload.fields([{ name: "attachments" }])(
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
        const result = await prisma.uploads.createMany({
          data: attachments.map((attachment) => ({
            file: `/uploads/${attachment.filename}`,
            postId,
            fileName: attachment.originalname,
            fileType: attachment.mimetype,
            userId: Number.parseInt(session.user.id),
          })),
        });
        return res.status(200).json(result);
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

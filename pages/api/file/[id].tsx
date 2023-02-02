import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import fs from "fs";

const FileResponse = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case "GET":
            // Render file
            const file = await prisma.file.findUnique({
                where: {
                    id: Number(id),
                },
                select: {
                    name: true,
                    size: true,
                    type: true,
                    buffer: true,
                },
            });
            res.setHeader("Content-Type", file.type);
            res.setHeader("Content-Length", file.size);
            res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
            res.end(file.buffer);
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};


export default FileResponse;

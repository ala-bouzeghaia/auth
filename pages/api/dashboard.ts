// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);
  const prisma = new PrismaClient();

  if (req.method !== "GET") {
    return res.status(400).json({ message: "Only GET requests are allowed" });
  }

  // const token = cookies.get("token");
  const token = req.headers.authorization?.split(" ")[1];

  if (req.url?.includes("/dashboard")) {
    if (!token) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as jwt.JwtPayload;
      const userId: string = payload.userId;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      res.status(200).send({ user });
      await prisma.$disconnect();
    } catch (err) {
      res.status(500).json({ err });
    }
    await prisma.$disconnect();
  }
}

export default handler;

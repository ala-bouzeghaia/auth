// import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.cookies;
  if (!cookies.token) return res.status(401).send("Unauthorized");
  const refreshToken = cookies.token;
  // const prisma = new PrismaClient()
  // const foundUser = await prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.status(403);
      const decodedPayload = decoded as jwt.JwtPayload;
      console.log("refresh api payload", decodedPayload);
      const newAccessToken = jwt.sign(
        { userId: decodedPayload.userId },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "10s" }
      );
      res.send({ accessToken: newAccessToken });
    }
  );
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { validateEmail } from "../../utils/validateEmail";
import generateJwt from "../../utils/generateJwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST requests are allowed" });
  }
  if (!req.body) {
    return res.status(404).json({ message: "Body is missing" });
  }
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // const token = generateJwt(user.id);
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );
    console.log({ accessToken });
    console.log({ refreshToken });
    const cookies = new Cookies(req, res);
    cookies.set("token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 3600 * 1000,
    });
    res.send({ user, token: accessToken });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
  await prisma.$disconnect();
};

export default handler;

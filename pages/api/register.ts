import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import validateForm from "../../utils/validateForm";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST requests are allowed" });
  }
  try {
    const newUser: User = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    if (existingUser) {
      await prisma.$disconnect();
      return res.status(401).send({ message: "User already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(newUser.password, salt);

    const user = await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: bcryptPassword,
      },
    });
    console.log(user);
    res.status(201).send({ user });
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
  await prisma.$disconnect();
}

export default validateForm(handler);

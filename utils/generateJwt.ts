import jwt from "jsonwebtoken";

const generateJwt = (userId: string) => {
  const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
  const payload = { userId };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
};

export default generateJwt;

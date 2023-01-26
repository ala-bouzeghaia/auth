import type { NextApiRequest, NextApiResponse } from "next";
import { validateEmail } from "./validateEmail";

const validateForm = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
      return res.status(404).json({ message: "Body is missing" });
    }
    const { name, email, password } = req.body;
    if (req.url?.includes("register")) {
      if (![name, email, password].every(Boolean)) {
        return res.status(401).json({ message: "Missing credentials" });
      } else if (!validateEmail(email)) {
        return res.status(401).json({ message: "Invalid email" });
      }
    } else if (req.url?.includes("login")) {
      if (![email, password].every(Boolean)) {
        return res.status(401).json({ message: "Missing credentials" });
      } else if (!validateEmail(email)) {
        return res.status(401).json({ message: "Invalid email" });
      }
    }
    return handler(req, res);
  };
};

export default validateForm;

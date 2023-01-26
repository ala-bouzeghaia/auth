import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = new Cookies(req, res);
    // console.log("dkjsbvksjbv");
    cookies.set("token", "", {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
    });
    // console.log(cookies);
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
  }
};

export default handler;

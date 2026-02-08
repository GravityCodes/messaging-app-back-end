import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

function verifyUserToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (typeof token == "undefined") {
    return res.sendStatus(403);
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json("An error occured verifying the user");
  }
}

export { verifyUserToken };

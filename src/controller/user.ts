import type { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res.send(200).json({ msg: "User" });
};

export default { getUser };

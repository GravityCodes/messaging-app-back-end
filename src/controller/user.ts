import type { Request, Response } from "express";
import { Service } from "../services/user";
import { Repository } from "../repositories/user";

const service = new Service(new Repository());

const getUser = async (req: Request, res: Response) => {
  res.send(200).json({ msg: "User" });
};

const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please try again later",
    });
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const user = service.createUser(userName, password, email);

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please try again later.",
    });
  }
};

export default { getUser, loginUser, signupUser };

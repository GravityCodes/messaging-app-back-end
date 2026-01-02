import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Service } from "../services/user";
import { Repository } from "../repositories/user";

const service = new Service(new Repository());

const getUser = async (req: Request, res: Response) => {
  res.send(200).json({ msg: "User" });
};

const loginUser = async (req: Request, res: Response) => {
  //Login user.
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      console.error(result.array());
      return res.status(400).json({ errors: result.array() });
    }

    const { userName, email, password } = req.body;

    const user = service.createUser(userName, password, email);

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please Try again later.",
    });
  }
};

export default { getUser, loginUser, signupUser };

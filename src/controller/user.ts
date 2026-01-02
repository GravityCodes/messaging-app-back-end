import type { Request, Response } from "express";
import validator from "../validator/user.js";
import { validationResult } from "express-validator";
import { hashPassword } from "../utils/password.js";
import { prisma } from "../lib/prisma.js";

const getUser = async (req: Request, res: Response) => {
  res.send(200).json({ msg: "User" });
};

const loginUser = async (req: Request, res: Response) => {
  //Login user.
};

const signupUser = [
  validator.createUser,
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        console.error(result.array());
        return res.status(400).json({ errors: result.array() });
      }

      const { userName, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          userName,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ msg: "New user created succesfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errors: "An internal server error has occured. Please Try again later.",
      });
    }
  },
];

export default { getUser, loginUser, signupUser };

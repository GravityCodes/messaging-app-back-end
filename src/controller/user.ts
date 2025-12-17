import type { Request, Response } from "express";
import validator from "../validator/user.js";
import { validationResult } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

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
        return res.status(400).json({ errors: result.array() });
      }

      const { userName, email, password } = req.body;

      const user = await prisma.user.create({
        data: {
          userName,
          email,
          password,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errors: "An internal server error has occured. Please Try again later.",
      });
    }
  },
];

export default { getUser, loginUser, signupUser };

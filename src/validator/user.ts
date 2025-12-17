import { body } from "express-validator";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const createUser = [
  body("userName").trim().notEmpty().withMessage("User name must not be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User name must not be empty")
    .isEmail()
    .withMessage("Email has incorrect format")
    .custom(async (value) => {
      const result = await prisma.user.findUnique({
        where: { email: value },
      });

      if (result) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isStrongPassword()
    .withMessage("Password is not strong enough"),
  body("passwordConfirmation")
    .notEmpty()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
];

export default { createUser };

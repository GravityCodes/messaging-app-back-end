import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const createUser = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("User name must not be empty")
    .isLength({ max: 12 })
    .withMessage("User name is too long")
    .isLength({ min: 3 })
    .withMessage("User name is too short"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
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

const loginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email has incorrect format")
    .custom(async (value) => {
      const result = await prisma.user.findUnique({
        where: { email: value },
      });

      if (!result) {
        throw new Error("E-mail not found");
      }
    }),
  body("password").notEmpty().withMessage("Password must not be empty"),
];


const updateUser = [
  body()
];
export default { createUser, loginUser };

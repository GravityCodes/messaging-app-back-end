import type { Request, Response } from "express";
import { Service } from "../services/user.js";
import { Repository } from "../repositories/user.js";

const service = new Service(new Repository());

const getUser = async (req: Request, res: Response) => {
  return res.status(200).json({ msg: "User" });
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const cookieAge = 7 * 24 * 60 * 60 * 1000; // 7 days;

    const user = await service.checkUser(email, password);

    if (!user) {
      return res
        .status(401)
        .json({ errors: "The email or password is incorrect." });
    }

    const token = service.createUserToken(user);

    return res
      .cookie("token", token, {
        maxAge: cookieAge,
        sameSite: "strict",
        httpOnly: true,
        domain: process.env.DOMAIN,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please try again later.",
    });
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const user = await service.createUser(userName, password, email);

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please try again later.",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    let { userName } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const profileImage = files?.["profile"]?.[0] || undefined;
    const bannerImage = files?.["banner"]?.[0] || undefined;

    if (userName == req.user.userName) {
      userName = undefined;
    }

    const user = await service.updateUserProfile(
      profileImage,
      bannerImage,
      userName,
      req.user.id,
    );

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "An internal server error has occured. Please try again later.",
    });
  }
};

export default { getUser, loginUser, signupUser, updateUser };

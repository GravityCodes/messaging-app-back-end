import type { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res.send(200).json({ msg: "User" });
};

const loginUser = async(req: Request, res: Response) => {
    //Login user.
}

const signupUser = async(req: Request, res: Response) => {
  //Sign Up User
}



export default { getUser, loginUser, signupUser };

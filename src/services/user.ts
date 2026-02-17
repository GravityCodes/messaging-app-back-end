import "dotenv/config";
import { Repository } from "../repositories/user.js";
import { hashPassword, checkPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

interface user {
  email: string;
  password: string;
}

export class Service {
  constructor(private repo: Repository) {}

  async getAllUsers() {
    const users = await this.repo.getAllUsers();

    return users;
  }

  async createUser(userName: string, password: string, email: string) {
    const hashedPassword = await hashPassword(password);

    return this.repo.createUser(userName, email, hashedPassword);
  }

  createUserToken(user: user) {
    const token = jwt.sign(user, process.env.SECRET_KEY as string, {
      expiresIn: "7d",
    });

    return token;
  }

  async checkUser(email: string, password: string) {
    const user = await this.repo.findUser(email);

    if (!user) {
      return false;
    }

    if (!checkPassword(password, user.password)) {
      return false;
    }

    return user;
  }

  async removeUser(id: number) {
    const deletedUser = this.repo.removeUser(id);
    return deletedUser;
  }

  async updateUserProfile(
    profileImage: Express.Multer.File | undefined,
    bannerImage: Express.Multer.File | undefined,
    userName: string | undefined,
    id: number,
  ) {
    const user = await this.repo.updateUser(
      profileImage,
      bannerImage,
      userName,
      id,
    );

    return user;
  }
}

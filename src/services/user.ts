import "dotenv/config";
import { Repository } from "../repositories/user";
import { hashPassword, checkPassword } from "../utils/password";
import jwt from "jsonwebtoken";

interface user {
  email: string;
  password: string;
}

export class Service {
  constructor(private repo: Repository) {}

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
}

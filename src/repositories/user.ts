import { prisma } from "../lib/prisma.js";
import type { User } from "../generated/prisma/client.js";

export class Repository {
  async createUser(
    userName: string,
    email: string,
    hashedPassword: string,
  ): Promise<User | null> {
    const user = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findUser(
    email: string
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }
}

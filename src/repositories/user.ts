import { prisma } from "../lib/prisma.js";
import type { User } from "../generated/prisma/client.js";
import { createClient } from "@supabase/supabase-js";

export class Repository {
  #supabase = createClient(
    `${process.env.SUPABASE_PROJECT_URL}`,
    `${process.env.SUPABASE_API_KEY}`,
  );

  async #uploadFile(
    file: Buffer,
    userId: number,
    fileName: string,
    fileType: string,
  ) {
    const { data, error } = await this.#supabase.storage
      .from("messaging-app")
      .upload(`users/${userId}/${fileName}.${fileType}`, file);
    if (error) {
      throw new Error(`${error}`);
    } else {
      const { data } = this.#supabase.storage
        .from("messaging-app")
        .getPublicUrl(`users/${userId}/${fileName}.${fileType}`);
      return data.publicUrl;
    }
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  }

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

  async findUser(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async updateUser(
    profileImage: Express.Multer.File | undefined,
    bannerImage: Express.Multer.File | undefined,
    userName: string | undefined,
    id: number,
  ): Promise<User | null> {
    let profileImageUrl = "";
    let bannerImageUrl = "";

    if (profileImage !== undefined) {
      profileImageUrl = await this.#uploadFile(
        profileImage.buffer,
        id,
        "profile",
        profileImage.mimetype.slice(6),
      );
    }

    if (bannerImage !== undefined) {
      bannerImageUrl = await this.#uploadFile(
        bannerImage.buffer,
        id,
        "banner",
        bannerImage.mimetype.slice(6),
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(profileImage !== undefined
          ? {
              profilePicture: profileImageUrl,
            }
          : {}),
        ...(bannerImage !== undefined
          ? {
              banner: bannerImageUrl,
            }
          : {}),
        ...(userName !== undefined
          ? {
              userName,
            }
          : {}),
      },
    });

    return user;
  }

  async removeUser(id: number) {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return deletedUser;
  }
}

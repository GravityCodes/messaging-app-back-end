import { afterAll, beforeAll, describe, expect, test } from "vitest";
import app from "../app.js";
import request from "supertest";
import { prisma } from "../lib/prisma.js";

const newUser = {
  userName: "JohanM",
  email: "test@gmail.com",
  password: "Pa$$word#1",
  passwordConfirmation: "Pa$$word#1",
};

test("truthy resolves to true", () => {
  expect(true).toBe(true);
});

// TODO: Add unit testing
describe("User Route Integration Test", () => {
  beforeAll(async () => {
    if (process.env.NODE_ENV === "test") {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
      );
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("user gets created", async () => {
    const res = await request(app).post("/user/signup").send(newUser);

    expect(res.status).toBe(201);
  });
});

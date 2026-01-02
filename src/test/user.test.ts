import { expect, test } from 'vitest';
import app from "../app.js";
import request from "supertest";


const newUser = {
  userName: "JohanM",
  email: "test@gmail.com",
  password: "Pa$$word#1",
  passwordConfirmation: "Pa$$word#1"
}

test('truthy resolves to true', () => {
  expect(true).toBe(true);
});

// TODO: Add unit testing 

test("user gets created", async () => {
  const res = await request(app)
    .post('/user/signup')
    .send(newUser)

  expect(res.status).toBe(201);
})

import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should able to authenticate user", async () => {
    const name = "User Authentication Test";
    const email = "test@example.com";
    const password = "12345678";

    await request(app)
      .post("/api/users")
      .send({
        name,
        email,
        password
      });

    const response = await request(app)
      .post("/api/session")
      .send({
        email,
        password
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to authenticate if user already not exists", async () => {
    const email = "testusernotfould@example.com";
    const password = "12345678";

    const response = await request(app)
      .post("/api/session")
      .send({
        email,
        password
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("E-mail ou password incorrect")
  });

  it("should not be able to authenticate if password is incorrect", async () => {
    const name = "User Authentication Password Incorrect";
    const email = "testpassword@example.com";
    const password = "12345678";

    await request(app)
      .post("/api/users")
      .send({
        name,
        email,
        password
      });

    const password_incorrect = "87654321";


    const response = await request(app)
      .post("/api/session")
      .send({
        email,
        password: password_incorrect
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("E-mail ou password incorrect")
  });
})
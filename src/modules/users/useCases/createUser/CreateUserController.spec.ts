import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "User Test",
        email: "user@example.com",
        password: "12345678"
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user if the user already exists", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "User Test",
        email: "user@example.com",
        password: "12345678"
      });

    expect(response.body.message).toBe("User already exists");
    expect(response.status).toBe(400);
  });
});
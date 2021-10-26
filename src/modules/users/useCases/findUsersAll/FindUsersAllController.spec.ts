import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Find User By Id Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should able to find all users", async () => {
    const name = "User Test";
    const email = "test@example.com";
    const password = "12345678";

    // Create user
    const response_create_user =  await request(app)
      .post("/api/users")
      .send({
        name,
        email,
        password
      });

    const { id } = response_create_user.body;

    // Create session
    const response_session = await request(app)
      .post("/api/session")
      .send({
        email,
        password
      });

    const { token } = response_session.body;

    const response = await request(app)
      .get(`/api/users`)
      .set({
        Authorization: `Bearer ${token}`
      });    

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
  });
});
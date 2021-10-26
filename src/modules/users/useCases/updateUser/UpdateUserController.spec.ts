import request from "supertest";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Update User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should able to update user", async () => {
    const name = "User Test";
    const email = "test@example.com";
    const password = "12345678";

    // Create user
    await request(app)
      .post("/api/users")
      .send({
        name,
        email,
        password
      });

    // Create session
    const response_session = await request(app)
      .post("/api/session")
      .send({
        email,
        password
      });

    const { token } = response_session.body;

    const response = await request(app)
      .put("/api/users")
      .send({
        name: "User Update",
        email: "emailupdate@example.com",
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
  });

  it("should not able to update user if email in use", async () => {
    const name_one = "User One Test Email";
    const email_one = "testemailone@example.com";

    const name_two = "User Two Test Email";
    const email_two = "testemailtwo@example.com";

    const password = "12345678";

    // Create users
    await request(app)
      .post("/api/users")
      .send({
        name: name_one,
        email: email_one,
        password
      });

    await request(app)
      .post("/api/users")
      .send({
        name: name_two,
        email: email_two,
        password
      });


    // Create session
    const response_session = await request(app)
      .post("/api/session")
      .send({
        email: email_one,
        password
      });

    const { token } = response_session.body;

    const response = await request(app)
      .put("/api/users")
      .send({
        name: "User Update E-mail In Use",
        email: email_two,
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.body.message).toBe("E-mail in use");
    expect(response.status).toBe(400);
  });
});
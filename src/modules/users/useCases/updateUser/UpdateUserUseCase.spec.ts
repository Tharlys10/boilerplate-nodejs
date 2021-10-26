import { hash } from "bcrypt"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { UpdateUserUseCase } from "./UpdateUserUseCase"
import { AppError } from "@shared/errors/AppError"

let usersRepositoryInMemory: UsersRepositoryInMemory
let updateUserUseCase: UpdateUserUseCase

describe("Update User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it("should able to update user", async () => {
    const name = "User Test";
    const email = "test@example.com";
    const password = "12345678";

    const { id } = await usersRepositoryInMemory.create({ name, email, password: await hash(password, 8) });

    const user = await updateUserUseCase.execute({ id, name: "Test User", email });

    expect(user.name).toEqual("Test User");
    expect(String(user.updated_at).substr(0, 16)).toEqual(String(new Date()).substr(0, 16));
  });

  it("should not able to update a user not found", async () => {
    const id = "e96d7bcd-8470-497e-b73b-90e828e976e8";
    const name = "User Test Not Found";
    const email = "testusernotfound@example.com";

    await expect(updateUserUseCase.execute({
      id,
      name,
      email
    })).rejects.toEqual(new AppError("User not found", 404))
  });

  it("should not able to update user if email in use", async () => {
    const name_one = "User One Test Email";
    const email_one = "testemailone@example.com";

    const name_two = "User Two Test Email";
    const email_two = "testemailtwo@example.com";

    const password = "12345678";

    await usersRepositoryInMemory.create({ name: name_one, email: email_one, password: await hash(password, 8) });
    const { id } = await usersRepositoryInMemory.create({ name: name_two, email: email_two, password: await hash(password, 8) });


    await expect(updateUserUseCase.execute({
      id,
      name: "Name Update",
      email: email_one,
    })).rejects.toEqual(new AppError("E-mail in use"))
  });
})
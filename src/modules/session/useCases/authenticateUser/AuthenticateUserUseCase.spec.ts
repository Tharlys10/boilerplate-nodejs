import { hash } from "bcrypt";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { AppError } from "@shared/errors/AppError";

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it("should able to authenticate user", async () => {
    const name = "User Authentication Test";
    const email = "test@example.com";
    const password = "12345678";

    await usersRepositoryInMemory.create({ name, email, password: await hash(password, 8) });

    const session = await authenticateUserUseCase.execute(email, password);

    expect(session).toHaveProperty("token");
  });

  it("should not be able to authenticate if user already not exists", async () => {
    const email = "test@example.com";
    const password = "12345678";

    await expect(authenticateUserUseCase.execute(
      email,
      password
    )).rejects.toEqual(new AppError("E-mail ou password incorrect"))
  });

  it("should not be able to authenticate if password is incorrect", async () => {
    const name = "User Authentication Password Incorrect";
    const email = "testpassword@example.com";
    const password = "12345678";

    await usersRepositoryInMemory.create({ name, email, password: await hash(password, 8) });

    const password_incorrect = "87654321";

    await expect(authenticateUserUseCase.execute(
      email,
      password_incorrect
    )).rejects.toEqual(new AppError("E-mail ou password incorrect"))
  });
})

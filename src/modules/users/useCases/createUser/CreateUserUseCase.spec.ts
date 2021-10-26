import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to create a new user", async () => {
    const name = "User Test";
    const email = "test@example.com";
    const password = "12345678";

    const user = await createUserUseCase.execute({ name, email, password });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user if the user already exists", async () => {
    const name = "User Test Already Exists";
    const email = "test@example.com";
    const password = "12345678";

    await usersRepositoryInMemory.create({ name, email, password: await hash(password, 8) });

    await expect(createUserUseCase.execute({
      name,
      email,
      password
    })).rejects.toEqual(new AppError("User already exists"))
  })
})
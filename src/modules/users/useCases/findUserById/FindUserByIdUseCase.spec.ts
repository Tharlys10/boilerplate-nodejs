import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let findUserByIdUseCase: FindUserByIdUseCase;

describe("Find User By Id", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    findUserByIdUseCase = new FindUserByIdUseCase(usersRepositoryInMemory);
  });

  it("should able to find user by id", async () => {
    const name = "User Test";
    const email = "test@example.com";
    const password = "12345678";

    const { id } = await usersRepositoryInMemory.create({ name, email, password: await hash(password, 8) });

    const user = await findUserByIdUseCase.execute(id);

    expect(user).toHaveProperty("id");
    expect(user.name).toEqual(name);
  });

  it("should not able to find user not found", async () => {
    const id = "9eef6262-68fd-4256-9352-1d7b998132e0";

    await expect(
      findUserByIdUseCase.execute(id)
    ).rejects.toEqual(new AppError("User not found", 404))
  });
});
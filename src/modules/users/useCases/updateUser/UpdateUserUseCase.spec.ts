import { hash } from "bcrypt"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

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
})
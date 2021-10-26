import { hash } from "bcrypt";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { FindUsersAllUseCase } from "./FindUsersAllUseCase";


let usersRepositoryInMemory: UsersRepositoryInMemory;
let findUsersAllUseCase: FindUsersAllUseCase;

describe("Find Users All", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    findUsersAllUseCase = new FindUsersAllUseCase(usersRepositoryInMemory);
  });


  it("should able to find all users", async () => {
    const password = "12345678";

    await usersRepositoryInMemory.create({ name: "User Test One", email: "testone@example.com", password: await hash(password, 8) });
    await usersRepositoryInMemory.create({ name: "User Test Two", email: "testtwo@example.com", password: await hash(password, 8) });

    const {users, total} = await findUsersAllUseCase.execute();

    expect(users[0].email).toEqual("testone@example.com");
    expect(total).toBe(2);
  });
});
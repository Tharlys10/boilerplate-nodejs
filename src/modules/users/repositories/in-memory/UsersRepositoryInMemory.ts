import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date()
    });

    this.users.push(user);

    return user;
  }

  async update({ id, name, email }: IUpdateUserDTO): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users[index].name = name;
    this.users[index].email = email;
    this.users[index].updated_at = new Date();

    return this.users[index];
  }
}

export { UsersRepositoryInMemory };

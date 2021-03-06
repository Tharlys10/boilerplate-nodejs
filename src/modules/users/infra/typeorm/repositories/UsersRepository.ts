import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { IUsersAllResponse } from "@modules/users/dtos/IUsersAllResponse";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository, ILike } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository = getRepository(User);

  async find(limit: number = 10, offset: number = 0, search: string = ''): Promise<{users: User[], total: number}> {
    const [users, total] = await this.repository.findAndCount({
      where: {
        name: ILike(`%${search}%`)
      },
      take: limit, 
      skip: offset,
      order: {name: "ASC"}
    });

    return {users, total};
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    await this.repository.save(user);

    return user;
  }

  async update({ id, name, email }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.save({ id, name, email });

    return user;
  }
}

export { UsersRepository };

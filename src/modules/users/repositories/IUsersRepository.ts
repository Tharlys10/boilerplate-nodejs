import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };

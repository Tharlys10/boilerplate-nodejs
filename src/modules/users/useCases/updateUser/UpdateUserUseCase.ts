import { inject, injectable } from "tsyringe"

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ id, name, email }: IUpdateUserDTO): Promise<User> {
    const checkExistUser = await this.usersRepository.findById(id);

    if (!checkExistUser) {
      throw new AppError("User not found");
    }

    // Check e-mail if disponible
    if (checkExistUser.email !== email) {
      const checkExistUserByEmail = await this.usersRepository.findByEmail(email);

      if (checkExistUserByEmail) {
        throw new AppError("E-mail in use");
      }
    }

    const user = await this.usersRepository.update({ id, name, email });

    return user;
  }
}

export { UpdateUserUseCase }
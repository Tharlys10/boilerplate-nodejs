import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersAllResponse } from "@modules/users/dtos/IUsersAllResponse";
import { UserMap } from "@modules/users/mapper/UserMap";

@injectable()
class FindUsersAllUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(limit?: number, offset?: number, search?: string): Promise<IUsersAllResponse> {
    const {users, total} = await this.usersRepository.find(limit, offset, search);

    const users_maps = users.map((user) => UserMap.toDTO(user));

    return {users: users_maps, total};
  }
}

export {FindUsersAllUseCase}
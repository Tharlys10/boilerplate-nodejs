import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUsersAllUseCase } from "./FindUsersAllUseCase";


class FindUsersAllController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {amount = 10, page = 1, search = ''} = request.query;

    const findUsersAllUseCase = container.resolve(FindUsersAllUseCase);

    const {users, total} = await findUsersAllUseCase.execute(Number(amount), Number(page) - 1, String(search))

    return response.json({users, total});
  }
}

export {FindUsersAllController}
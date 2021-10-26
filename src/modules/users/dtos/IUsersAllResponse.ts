import { IUserResponseDTO } from "./IUserResponseDTO";

interface IUsersAllResponse {
  users: IUserResponseDTO[];
  total: number;
}

export {IUsersAllResponse}
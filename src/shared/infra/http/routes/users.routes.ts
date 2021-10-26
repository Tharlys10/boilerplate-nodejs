import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { FindUserByIdController } from "@modules/users/useCases/findUserById/FindUserByIdController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();


usersRoutes.post("/", new CreateUserController().handle);
usersRoutes.get("/:id", ensureAuthentication, new FindUserByIdController().handle);
usersRoutes.put("/", ensureAuthentication, new UpdateUserController().handle);

export { usersRoutes }
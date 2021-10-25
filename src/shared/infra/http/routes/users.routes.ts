import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();

usersRoutes.post("/", new CreateUserController().handle);
usersRoutes.put("/", ensureAuthentication, new UpdateUserController().handle);

export { usersRoutes }
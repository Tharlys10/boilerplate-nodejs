import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

usersRoutes.post("/", new CreateUserController().handle);
usersRoutes.put("/:id", new UpdateUserController().handle);

export { usersRoutes }
import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";

const usersRoutes = Router();

usersRoutes.post("/", new CreateUserController().handle);

export { usersRoutes }
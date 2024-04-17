import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { GetAllUsersController } from "./useCases/getAllUsers/getAllUsersController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getAllUserController = new GetAllUsersController();
router.post("/user", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/getUsers", getAllUserController.handle);
export { router };

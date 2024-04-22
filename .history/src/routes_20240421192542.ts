import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { GetAllUsersController } from "./useCases/getAllUsers/getAllUsersController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { GetOneUserController } from "./useCases/getOneUser/getOneUserController";

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getAllUserController = new GetAllUsersController();
const getOneUserController = new GetOneUserController();
router.post("/user", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/getUsers", getAllUserController.handle);
router.get("/getuser/:id", getAllUserController.handle);
export { router };

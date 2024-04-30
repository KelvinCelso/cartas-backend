import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { GetAllUsersController } from "./useCases/getAllUsers/getAllUsersController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { GetOneUserController } from "./useCases/getOneUser/getOneUserController";
import { GetMessagesController } from "./useCases/getMessages/getMessagesController";
import { SendMessageController } from "./useCases/sendMessage/sendMessageController";
import { CreateCheckoutController } from "./useCases/createCheckout/createCheckoutController";
import { StoreTransactionController } from "./useCases/storeTransation/storeTransationController";
import express from "express";
const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const getAllUserController = new GetAllUsersController();
const getOneUserController = new GetOneUserController();
const getMessagesController = new GetMessagesController();
const sendMessageController = new SendMessageController();
const createCheckoutController = new CreateCheckoutController();
const storeTransactionController = new StoreTransactionController();
router.post("/user", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/getUsers", getAllUserController.handle);
router.get("/getuser/:id", getOneUserController.handle);
router.get("/getmessages", getMessagesController.handle);
router.post("/sendmessage", sendMessageController.handle);
router.post("/create-checkout", createCheckoutController.handle);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  storeTransactionController.handle
);
export { router };

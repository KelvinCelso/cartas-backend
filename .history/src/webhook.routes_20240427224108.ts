import { Router } from "express";
import { StoreTransactionController } from "./useCases/storeTransation/storeTransationController";
import express from "express";
const webhookrouter = Router();
const storeTransactionController = new StoreTransactionController();
webhookrouter.post(
  "/webhook",

  storeTransactionController.handle
);

export { webhookrouter };

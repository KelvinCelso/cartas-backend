import { Router } from "express";
import { StoreTransactionController } from "./useCases/storeTransation/storeTransationController";
import express from "express";
const webhookrouter = Router();
const storeTransactionController = new StoreTransactionController();
webhookrouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  storeTransactionController.handle
);

export { webhookrouter };

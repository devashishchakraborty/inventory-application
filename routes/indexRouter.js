import { Router } from "express";
import itemController from "../controllers/itemController.js";
const indexRouter = Router();

indexRouter.get("/", itemController.getItems);
indexRouter.get("/add", itemController.addItemGet);
indexRouter.get("/:itemId", itemController.getItemById);

indexRouter.post("/add", itemController.addItemPost);

export default indexRouter;

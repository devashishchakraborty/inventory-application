import { Router } from "express";
import itemController from "../controllers/itemController.js";
import authController from "../controllers/authController.js";
const indexRouter = Router();

indexRouter.get("/", itemController.getItems);
indexRouter.get("/add", itemController.addItemGet);
indexRouter.get("/authenticate", authController.authenticateGet);
indexRouter.get("/:itemId", itemController.getItem);
indexRouter.get("/:itemId/update", itemController.updateItemGet);
indexRouter.get("/:itemId/delete", itemController.deleteItem);

indexRouter.post("/add", itemController.addItemPost);
indexRouter.post("/authenticate", authController.authenticatePost);
indexRouter.post("/:itemId/update", itemController.updateItemPost);

export default indexRouter;

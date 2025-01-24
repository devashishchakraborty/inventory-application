import { Router } from "express";
import itemController from "../controllers/itemController.js";
const indexRouter = Router();

indexRouter.get("/", itemController.getItems);
indexRouter.get("/add-item", itemController.addItemGet);
indexRouter.get("/add-category", itemController.addCategoryGet);
indexRouter.get("/:itemId", itemController.getItemById)

export default indexRouter;

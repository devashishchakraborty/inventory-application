import { Router } from "express";
import itemController from "../controllers/itemController.js";
const indexRouter = Router();

indexRouter.get("/", itemController.getItems);
indexRouter.get("/add", itemController.addItemGet);
indexRouter.get("/:itemId", itemController.getItemById);
indexRouter.get("/:itemId/update", (req, res) => {});

indexRouter.post("/add", itemController.addItemPost);
indexRouter.post("/:itemId/update", (req, res) => {});
indexRouter.post("/:itemId/delete", (req, res) => {});
export default indexRouter;

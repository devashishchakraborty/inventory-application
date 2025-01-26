import { Router } from "express";
import itemController from "../controllers/itemController.js";
const indexRouter = Router();



indexRouter.get("/", itemController.getItems);
indexRouter.get("/add", itemController.addItemGet);
indexRouter.get("/authenticate", (req, res) => res.render("authenticate"));
indexRouter.get("/:itemId", itemController.getItem);
indexRouter.get("/:itemId/update", itemController.updateItemGet);
indexRouter.get("/:itemId/delete", itemController.deleteItem);


indexRouter.post("/add", itemController.addItemPost);
indexRouter.post("/:itemId/update", itemController.updateItemPost);
indexRouter.post("/authenticate", );

export default indexRouter;

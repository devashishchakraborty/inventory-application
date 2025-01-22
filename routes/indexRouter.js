import { Router } from "express";
import itemController from "../controllers/itemController.js";
const indexRouter = Router();

indexRouter.get("/", itemController.getItems);
indexRouter.get("/add-item", (req, res) => res.render("addItem"));

export default indexRouter;

import { Router } from "express";
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.get("/add-item", (req, res) => res.render("addItem"));

export default indexRouter;
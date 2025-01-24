import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/add", categoryController.addCategoryGet);
categoryRouter.get("/:categoryName", categoryController.getItemsByCategory);

categoryRouter.post("/add", categoryController.addCategoryPost);

export default categoryRouter;

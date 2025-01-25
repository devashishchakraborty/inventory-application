import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/add", categoryController.addCategoryGet);
categoryRouter.get("/:categoryName", categoryController.getItemsByCategory);
categoryRouter.get("/:categoryName/update", categoryController.updateCategoryGet);

categoryRouter.post("/:categoryName/update", categoryController.updateCategoryPost);
categoryRouter.post("/add", categoryController.addCategoryPost);

categoryRouter.get("/:categoryName/delete", categoryController.deleteCategory)

export default categoryRouter;

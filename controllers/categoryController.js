import queries from "../db/queries.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import utils from "../Utils.js";

const validateCategory = [
  body("categoryName")
    .toLowerCase()
    .trim()
    .custom(async (value) => {
      const categories = await queries.getAllCategories();
      const categoryNames = categories.map((category) => category.name);
      if (categoryNames.includes(value)) {
        throw new Error("Category already exists! Try a different one.");
      }
    }),
];

const getCategories = async (req, res) => {
  const categories = await queries.getAllCategories();
  res.render("categories", { categories: categories });
};

const getItemsByCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.params;
  const items = await queries.getItemsByCategory(categoryName);

  if (!items || items.length === 0) {
    throw new CustomNotFoundError("No Items found!");
  }

  res.render("index", { items: items, utils: utils });
});

const addCategoryGet = (req, res) => res.render("addCategory");

const addCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addCategory", {
        errors: errors.array(),
      });
    }

    const { categoryName } = req.body;
    await queries.insertCategory(categoryName);
    res.redirect("/categories");
  },
];

const updateCategoryGet = (req, res) => {
  const { categoryName } = req.params;
  res.render("updateCategory", { categoryName: categoryName });
};

const updateCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateCategory", {
        errors: errors.array(),
      });
    }

    await queries.updateCategory(
      req.body.categoryName,
      req.params.categoryName
    );
    res.redirect("/categories");
  },
];

const deleteCategory = async (req, res) => {
  const { categoryName } = req.params;
  await queries.deleteCategory(categoryName);
  res.redirect("/categories");
};

export default {
  getCategories,
  addCategoryGet,
  addCategoryPost,
  getItemsByCategory,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategory,
};

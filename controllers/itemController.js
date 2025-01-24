import queries from "../db/queries.js";
import asyncHandler from "express-async-handler";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import { body, validationResult } from "express-validator";
import utils from "../Utils.js";

const validateItem = [
  body("rating_points")
  .isFloat({ min: 1, max: 5 })
  .withMessage("Rating Points Must be between 1 and 5"),
  body("price")
  .isFloat({min: 0.01})
  .withMessage("Price must be more than 0"),
  body("rating_count")
  .isFloat({min: 1})
  .withMessage("Rating count must be more than 0")
];


const getItems = async (req, res) => {
  const items = await queries.getAllItems();
  const categories = await queries.getAllCategories();
  res.render("index", { items: items, categories: categories, utils: utils });
};

const addItemGet = async(req, res) => {
  const categories = await queries.getAllCategories();
  res.render("addItem", { categories: categories });
};

const addItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addItem", {
        errors: errors.array(),
      });
    }

    const item = req.body;
    await queries.insertItem(item);
    res.redirect("/");
  
  },
];

const getItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await queries.getItem(itemId);

  if (!item) {
    throw new CustomNotFoundError("Item not found");
  }

  res.render("item", { item: item, utils: utils });
});

const deleteItems = async (req, res) => {
  await queries.deleteAllItems();
  res.redirect("/");
};


export default {
  getItems,
  addItemGet,
  addItemPost,
  getItemById,
  deleteItems,
};

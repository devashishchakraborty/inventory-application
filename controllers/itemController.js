import queries from "../db/queries.js";
import asyncHandler from "express-async-handler";
import CustomNotFoundError from "../errors/CustomNotFoundError.js";
import utils from "../Utils.js";

const getItems = async (req, res) => {
  const items = await queries.getAllItems();
  const categories = await queries.getAllCategories();
  res.render("index", { items: items, categories: categories, utils: utils });
};

const addItemGet = async (req, res) => res.render("form");
const addItemPost = async (req, res) => {
  const item = req.body;
  await queries.insertItem(item);
  res.redirect("/");
};

const getItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const item = await queries.getItem(itemId);

  if (!item) {
    throw new CustomNotFoundError("Item not found");
  }

  res.render("item", { item: item });
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

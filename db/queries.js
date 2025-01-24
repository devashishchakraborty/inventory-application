import pool from "./pool.js";

const getAllItems = async () => {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
};

const getItem = async (id) => {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows[0];
};

const insertItem = async (item) => {
  await pool.query(
    "INSERT INTO items (title, category, image_url, description, price) VALUES ($1, $2, $3, $4, $5)",
    [item.title, item.category, item.image_url, item.description, item.price]
  );
};

const updateItem = async (item) => {
  await pool.query(
    "UPDATE items SET title=$1, category=$2, image_url=$3, description=$4, price=$5) WHERE id=$6",
    [
      item.title,
      item.category,
      item.image_url,
      item.description,
      item.price,
      item.id,
    ]
  );
};

const deleteItem = async (id) => {
  await pool.query("DELETE * FROM items WHERE id = $1", [id]);
};

const deleteAllItems = async () => {
  await pool.query("DELETE FROM items");
};

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

const addCategory = async (categoryName) => {
  await pool.query("INSERT INTO category (name) VALUES ($1)", [categoryName]);
};

export default {
  getItem,
  getAllItems,
  insertItem,
  updateItem,
  deleteItem,
  deleteAllItems,
  getAllCategories,
  addCategory,
};

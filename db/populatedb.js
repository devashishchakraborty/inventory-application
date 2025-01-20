#! /usr/bin/env node

import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";
import products from "./products.js";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const INSERT_CATEGORIES = `
INSERT INTO categories (name) VALUES 
  ('men''s clothing'), 
  ('jewelery'),
  ('electronics'),
  ('women''s clothing');
`;
const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS categories (
  name TEXT PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  category TEXT REFERENCES categories(name) ON DELETE SET NULL,
  image_url TEXT,
  description TEXT,
  price FLOAT,
  rating_points FLOAT,
  rating_count INTEGER
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}?sslmode=require`,
  });
  await client.connect();

  for (const product of products) {
    await client.query(
      `INSERT INTO items (title, category, image_url, description, price, rating_points, rating_count) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        product.title,
        product.category,
        product.image,
        product.description,
        product.price,
        product.rating.rate,
        product.rating.count,
      ]
    );
  }

  // await client.query(INSERT_CATEGORIES);
  await client.end();
  console.log("done");
}

main();

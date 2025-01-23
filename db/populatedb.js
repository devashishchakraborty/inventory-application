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
  price FLOAT
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
      `UPDATE items SET rating_count=$1, rating_points=$2 WHERE id=$3`,
      [
        product.rating.count,
        product.rating.rate,
        product.id
      ]
    );
  }

  // await client.query(INSERT_CATEGORIES);
  await client.end();
  console.log("done");
}

main();

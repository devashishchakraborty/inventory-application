#! /usr/bin/env node

import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";
import products from "./products.js";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS categories (
  name VARCHAR(100) PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(200),
  category VARCHAR(100) REFERENCES categories(name) ON DELETE SET NULL,
  image_url VARCHAR(200),
  description VARCHAR(500),
  price FLOAT,
  rating_points FLOAT,
  rating_count INTEGER
);


`;

const INSERT_VALUES = `
INSERT INTO items (name, category_id, image_url, description, price, rating_points, rating_count) VALUES 
  ('Bottle', 'How are you?'),
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}?sslmode=require`,
  });
  await client.connect();
  products.forEach((product) => {
    
  })
  await client.query(CREATE_TABLES);
  await client.end();
  console.log("done");
}

main();

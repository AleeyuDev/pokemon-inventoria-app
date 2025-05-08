// File: seed.js
require("dotenv").config();
const db = require("./models/db");

(async () => {
  // Create tables if not exist
  await db.query(`
    CREATE TABLE IF NOT EXISTS types (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS trainers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS pokemons (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      type_id INTEGER REFERENCES types(id) ON DELETE SET NULL,
      trainer_id INTEGER REFERENCES trainers(id) ON DELETE SET NULL
    );
  `);

  // Reset data
  await db.query("TRUNCATE pokemons, trainers, types RESTART IDENTITY CASCADE");

  // Seed
  await db.query(
    "INSERT INTO types (name) VALUES ('Fire'), ('Water'), ('Grass')"
  );
  await db.query("INSERT INTO trainers (name) VALUES ('Ash'), ('Misty')");
  await db.query(
    "INSERT INTO pokemons (name, type_id, trainer_id) VALUES ($1,$2,$3),($4,$5,$6)",
    ["Charmander", 1, 1, "Squirtle", 2, 2]
  );

  console.log("Seed complete");
  process.exit();
})();

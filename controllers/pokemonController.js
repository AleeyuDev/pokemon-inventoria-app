// File: controllers/pokemonController.js
const db = require("../models/db");

// List all Pokémons
exports.index = async (req, res) => {
  const { rows: pokemons } = await db.query(`
    SELECT p.id, p.name, t.name AS type, tr.name AS trainer
    FROM pokemons p
    JOIN types t ON p.type_id = t.id
    LEFT JOIN trainers tr ON p.trainer_id = tr.id
    ORDER BY p.id
  `);
  res.render("pokemons/index", { pokemons });
};

// Show form to create new Pokémon
exports.newForm = async (req, res) => {
  const { rows: types } = await db.query("SELECT * FROM types ORDER BY name");
  const { rows: trainers } = await db.query(
    "SELECT * FROM trainers ORDER BY name"
  );
  res.render("pokemons/new", { types, trainers });
};

// Create Pokémon
exports.create = async (req, res) => {
  const { name, type_id, trainer_id } = req.body;
  await db.query(
    "INSERT INTO pokemons (name, type_id, trainer_id) VALUES ($1, $2, $3)",
    [name, type_id || null, trainer_id || null]
  );
  res.redirect("/pokemons");
};

// Show single Pokémon
exports.show = async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    `
    SELECT p.id, p.name, t.name AS type, tr.name AS trainer
    FROM pokemons p
    JOIN types t ON p.type_id = t.id
    LEFT JOIN trainers tr ON p.trainer_id = tr.id
    WHERE p.id = $1
  `,
    [id]
  );
  if (!rows.length) return res.redirect("/pokemons");
  res.render("pokemons/show", { pokemon: rows[0] });
};

// Show edit form
exports.editForm = async (req, res) => {
  const { id } = req.params;
  const { rows: types } = await db.query("SELECT * FROM types ORDER BY name");
  const { rows: trainers } = await db.query(
    "SELECT * FROM trainers ORDER BY name"
  );
  const { rows } = await db.query("SELECT * FROM pokemons WHERE id = $1", [id]);
  if (!rows.length) return res.redirect("/pokemons");
  res.render("pokemons/edit", { pokemon: rows[0], types, trainers });
};

// Update Pokémon
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, type_id, trainer_id } = req.body;
  await db.query(
    "UPDATE pokemons SET name = $1, type_id = $2, trainer_id = $3 WHERE id = $4",
    [name, type_id || null, trainer_id || null, id]
  );
  res.redirect(`/pokemons/${id}`);
};

// Delete Pokémon
exports.destroy = async (req, res) => {
  await db.query("DELETE FROM pokemons WHERE id = $1", [req.params.id]);
  res.redirect("/pokemons");
};

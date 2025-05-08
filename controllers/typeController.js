// File: controllers/typeController.js
const db = require("../models/db");

// List all Types
exports.index = async (req, res) => {
  const { rows: types } = await db.query("SELECT * FROM types ORDER BY id");
  res.render("type/index", { types });
};

// Show form to create new Type
exports.newForm = (req, res) => {
  res.render("type/new");
};

// Create Type
exports.create = async (req, res) => {
  await db.query("INSERT INTO types (name) VALUES ($1)", [req.body.name]);
  res.redirect("/type");
};

// Show single Type
exports.show = async (req, res) => {
  const { rows } = await db.query(
    `
    SELECT ty.*, array_agg(p.name) AS pokemons
    FROM types ty
    LEFT JOIN pokemons p ON p.type_id = ty.id
    WHERE ty.id = $1
    GROUP BY ty.id
  `,
    [req.params.id]
  );
  if (!rows.length) return res.redirect("/types");
  res.render("type/show", { type: rows[0] });
};

// Show edit form
exports.editForm = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM types WHERE id = $1", [
    req.params.id,
  ]);
  if (!rows.length) return res.redirect("/types");
  res.render("type/edit", { type: rows[0] });
};

// Update Type
exports.update = async (req, res) => {
  await db.query("UPDATE types SET name = $1 WHERE id = $2", [
    req.body.name,
    req.params.id,
  ]);
  res.redirect(`/type/${req.params.id}`);
};

// Delete Type (nullify relations first)
exports.destroy = async (req, res) => {
  await db.query("UPDATE pokemons SET type_id = NULL WHERE type_id = $1", [
    req.params.id,
  ]);
  await db.query("DELETE FROM types WHERE id = $1", [req.params.id]);
  res.redirect("/type");
};

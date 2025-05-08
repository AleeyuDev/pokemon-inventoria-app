// File: controllers/trainerController.js
const db = require("../models/db");

// List all Trainers
exports.index = async (req, res) => {
  const { rows: trainers } = await db.query(
    "SELECT * FROM trainers ORDER BY id"
  );
  res.render("trainers/index", { trainers });
};

// Show form to create new Trainer
exports.newForm = (req, res) => {
  res.render("trainers/new");
};

// Create Trainer
exports.create = async (req, res) => {
  await db.query("INSERT INTO trainers (name) VALUES ($1)", [req.body.name]);
  res.redirect("/trainers");
};

// Show single Trainer
exports.show = async (req, res) => {
  const { rows } = await db.query(
    `
    SELECT tr.*, array_agg(p.name) AS pokemons
    FROM trainers tr
    LEFT JOIN pokemons p ON p.trainer_id = tr.id
    WHERE tr.id = $1
    GROUP BY tr.id
  `,
    [req.params.id]
  );
  if (!rows.length) return res.redirect("/trainers");
  res.render("trainers/show", { trainer: rows[0] });
};

// Show edit form
exports.editForm = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM trainers WHERE id = $1", [
    req.params.id,
  ]);
  if (!rows.length) return res.redirect("/trainers");
  res.render("trainers/edit", { trainer: rows[0] });
};

// Update Trainer
exports.update = async (req, res) => {
  await db.query("UPDATE trainers SET name = $1 WHERE id = $2", [
    req.body.name,
    req.params.id,
  ]);
  res.redirect(`/trainers/${req.params.id}`);
};

// Delete Trainer (nullify relations first)
exports.destroy = async (req, res) => {
  await db.query(
    "UPDATE pokemons SET trainer_id = NULL WHERE trainer_id = $1",
    [req.params.id]
  );
  await db.query("DELETE FROM trainers WHERE id = $1", [req.params.id]);
  res.redirect("/trainers");
};

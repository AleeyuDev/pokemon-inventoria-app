// File: server.js
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

require("dotenv").config();

const app = express();

// DB Connection (ensure your .env has DATABASE_URL)
const db = require("./models/db");

// View engine
app.set("views", path.join(__dirname, "views")); // Point to your views/;
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Routes
app.use("/pokemons", require("./routes/pokemonRoutes"));
app.use("/trainers", require("./routes/trainerRoutes"));
app.use("/type", require("./routes/typeRoutes"));

// Root redirect
app.get("/", (req, res) => res.redirect("/pokemons"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

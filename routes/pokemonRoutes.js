const _ = require("lodash");
const mongoose = require("mongoose");
const Pokemon = mongoose.model("pokemons");
const Move = mongoose.model("moves");
const Type = mongoose.model("types");
module.exports = app => {
  app.get("/api/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find(function(err, pokemon) {
      res.send(pokemon);
    });
  });
  app.post("/api/select/pokemon", async (req, res) => {
    req.user.pokemon = req.body;
    const user = await req.user.save();
    res.send(user);
  });
  app.get("/api/move", async (req, res) => {
    const pokemon = await Move.find({ name: req.query.name });
    res.send(pokemon);
  });
  app.get("/api/opponent/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find({ name: req.query.name });
    res.send(pokemon);
  });
  app.get("/api/opponent/move", async (req, res) => {
    const pokemon = await Move.find({ name: req.query.name });
    res.send(pokemon);
  });
  app.get("/api/type/move", async (req, res) => {
    const pokemon = await Type.find({ type: req.query.type });
    res.send(pokemon);
  });
};

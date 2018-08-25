const _ = require("lodash");
const mongoose = require("mongoose");
const Pokemon = mongoose.model("pokemons");
const Move = mongoose.model("moves");
module.exports = app => {
  app.get("/api/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find(function(err, pokemon) {
      res.send(pokemon);
    });
    // const pokemon = await Pokemon.find({ name: "Charmander" });
    // res.send(pokemon);
  });
  app.post("/api/select/pokemon", async (req, res) => {
    console.log("kdawg2", req.body);
    req.user.pokemon = req.body;
    const user = await req.user.save();
    res.send(user);
  });
  app.get("/api/move", async (req, res) => {
    console.log("move2:", req.query.name);
    // const pokemon = await Move.find(function(err, move) {
    //   console.log("move3:", move);
    //   res.send(move);
    // });
    const pokemon = await Move.find({ name: req.query.name });
    res.send(pokemon);
  });
};

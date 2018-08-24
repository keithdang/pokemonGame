const _ = require("lodash");
const mongoose = require("mongoose");
const Pokemon = mongoose.model("pokemons");
module.exports = app => {
  app.get("/api/pokemon", async (req, res) => {
    const pokemon = await Pokemon.find(function(err, pokemon) {
      res.send(pokemon);
    });
    // const pokemon = await Pokemon.find({ name: "charmander" });
    // res.send(pokemon);
  });
  app.post("/api/select/pokemon", async (req, res) => {
    console.log("kdawg2", req.body);
    req.user.pokemon = req.body;
    const user = await req.user.save();
    res.send(user);
  });
};

const _ = require("lodash");
const mongoose = require("mongoose");
//const Pokemon = mongoose.model("pokemon");
module.exports = app => {
  app.get("/api/pokemon", async (req, res) => {
    // const pokemon = await Pokemon.find({ _title });
    // res.send(pokemon);
    mongoose.model("pokemons").find(function(err, pokemon) {
      res.send(pokemon);
    });
  });
};

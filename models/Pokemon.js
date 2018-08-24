const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const pokemonSchema = new Schema({
  name: String
});
mongoose.model("pokemons", pokemonSchema);

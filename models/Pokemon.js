const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const pokemonSchema = new Schema({
  title: String
});
mongoose.model("pokemons", pokemonSchema);

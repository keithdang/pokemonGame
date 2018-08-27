const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const pokemonSchema = new Schema({
  name: String,
  pokeId: Number,
  type: String,
  image: String,
  moves: Array,
  level: Number
});
mongoose.model("pokemons", pokemonSchema);

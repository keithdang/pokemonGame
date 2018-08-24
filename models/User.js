const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const Pokemon = require("./Pokemon");
const userSchema = new Schema({
  googleId: String,
  points: { type: Number, default: 0 },
  pokemon: [Pokemon]
});
mongoose.model("users", userSchema);

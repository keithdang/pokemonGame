const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring equivalent to: const Schema = mongoose.Schema;
const moveSchema = new Schema({
  name: String,
  attackPoints: Number,
  type: String
});
mongoose.model("moves", moveSchema);

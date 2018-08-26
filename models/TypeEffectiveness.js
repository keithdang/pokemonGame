const mongoose = require("mongoose");
const { Schema } = mongoose;
const typeSchema = new Schema({
  type: String,
  damageMultiplier: Number
});
mongoose.model("types", typeSchema);

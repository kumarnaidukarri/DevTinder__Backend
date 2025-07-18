const mongoose = require("mongoose");

// 'Schema' defines what properties/attributes do our 'collection' have
const userSchema = new mongoose.Schema({
  firstName: { typeof: String },
  lastName: { typeof: String },
  gender: String,
  age: Number,
  email: String,
  password: String,
});
// to use a Schema, we need a 'Model'
const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

const mongoose = require("mongoose");

// 'Schema' defines what properties/attributes do our 'collection' have
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: String,
  password: String,
});
// to use a Schema, we need a 'Model'
const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

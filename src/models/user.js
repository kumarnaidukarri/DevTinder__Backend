const mongoose = require("mongoose");

// 'Schema' defines what properties/attributes do our 'collection' have
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minLength: 6, maxLength: 25 },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: { type: String, default: "this is default user info" },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    skills: { type: [String] },
  },
  { timestamps: true }
);
// to use a Schema, we need a 'Model'
const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

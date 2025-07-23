const mongoose = require("mongoose");
const validator = require("validator"); //tool for email,url,password validation

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
      validate(value) {
        //Database Schema-Level Data Validation
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        //Database Schema-Level Data Validation
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Enter a Strong Password: " +
              value +
              "\n note:- Password should be atleast  8 characters length, 1 uppercase, 1 lowercase, 1 number, 1 special symbol."
          );
        }
      },
    },
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
      validate(value) {
        //Database Schema-Level Data Validation
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    skills: { type: [String] },
  },
  { timestamps: true }
);
// to use a Schema, we need a 'Model'
const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

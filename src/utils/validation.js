//JS file contains all HELPER or UTILITY functions.
const validator = require("validator"); // "validator" Library NPM for email,url,password validation

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is invalid!");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is invalid!");
  } else if (
    password === "" ||
    password === undefined ||
    !validator.isStrongPassword(password)
  ) {
    throw new Error(
      "Enter a strong Password! It should be atleast 8 characters length, 1 uppercase, 1 lowercase, 1 number, 1 special symbol."
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };

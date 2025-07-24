//JS file contains all HELPER or UTILITY functions.
const validator = require("validator"); // "validator" Library NPM for email,url,password validation

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please enter a strong Password! Password should be atleast 8 characters length, 1 uppercase, 1 lowercase, 1 number, 1 special symbol."
    );
  }
};

module.exports = { validateSignUpData };

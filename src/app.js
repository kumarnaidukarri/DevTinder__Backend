const express = require("express");
const app = express();

const { connectDB } = require("./config/database.js");
const { userModel } = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const { userAuth } = require("./middlewares/auth.js"); //Authentication Middleware

const bcrypt = require("bcrypt"); //'bcrypt' Library for Password Encryption Decryption
const validator = require("validator"); //'validator' Library
const cookieParser = require("cookie-parser"); //'cookie-parser' Library
const jwt = require("jsonwebtoken"); //'jsonwebtoken' Library

app.use(express.json()); // middleware converts JSON data into Javascript object
app.use(cookieParser()); // middleware parses Cookies from Request object

// Signup API - insert user data into Database
app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    let userIns = userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await userIns.save(); //data will save into Database
    res.send("User added Successfully ...");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login API - user login using {email, password}
app.post("/login", async (req, res) => {
  try {
    // Email validation
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is invalid!");
    }

    // Finding User in DB
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not registered.");
    }

    // Password comparing
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the Token to Cookie and send the response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      }); //cookie with 1day expiry

      res.send("Login Success!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Profile API - get user profile data
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// SendConnectionRequest API -
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " Sent the connection request!");
});

connectDB()
  .then(() => {
    console.log("Database connection Success ...");
    //only after DB connection, listening for API client requests
    app.listen(3000, function () {
      console.log("Server listening on port 3000 ...");
    });
  })
  .catch((err) => {
    console.error("Database connection Failed...");
  });

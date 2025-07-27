const express = require("express");
const authRouter = express.Router(); // auth Router

const bcrypt = require("bcrypt"); //'bcrypt' Library
const validator = require("validator"); //'validator' Library
const { validateSignUpData } = require("../utils/validation.js");
const { userModel } = require("../models/user.js");

// Signup API - insert user data into Database
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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

// Logout API
authRouter.post("/logout", async (req, res) => {
  // Delete JWT token from Cookies and Expire token
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Success!!!");
});

module.exports = authRouter;

/*
Express Router :-
Router is used to manage Routes efficiently. 
Each Router handles a group of Routes or APIs.
Router is like a Mini-Express app that you can attach routes to and then plug into your Main Express app.
Ex: 
 userRouter = express.Router(); 
 userRouter.get('/profile', handlerFunction);
 userRouter.post('/data', handlerFunction);

 app.use('/users', userRouter);
*/

const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const { userModel } = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
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
    const isPasswordValid = await bcrypt.compare(password, user.password); //(password,HashedPassword)
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DevTinder"); //sign(data,secretKey)
      // Add the Token to Cookie and send the response back to user
      res.cookie("token", token);
      res.send("Login Success");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Profile API - get user profile data
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies; //{c1:v1, c2:v2, ...}
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    // Validate my Token
    const decodedMessage = await jwt.verify(token, "DevTinder"); //verify(token,secretKey)
    const { _id } = decodedMessage;

    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Get API - get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await userModel.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - get all users from Database
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update API - update user by id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    // API-Level Data Validation / Data Sanitization
    const ALLOWED_UPDATES = ["age", "gender", "skills", "about", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills?.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    //
    const user = await userModel.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed: " + err.message);
  }
});

// Delete API - delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
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

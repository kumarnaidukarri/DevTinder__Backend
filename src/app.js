const express = require("express");
const app = express();
const { connectDB } = require("./config/database.js");
const { userModel } = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt"); // 'bcrypt' Library Npm for Password Encryption Decryption

app.use(express.json()); // middleware converts JSON data into Javascript object

// Post API - insert user data into Database
app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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
    res.status(400).send("Error : " + err.message);
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

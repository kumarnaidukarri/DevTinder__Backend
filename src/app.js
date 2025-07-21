const express = require("express");
const { connectDB } = require("./config/database.js");
const { userModel } = require("./models/user.js");

const app = express();

app.use(express.json()); // middleware converts JSON data into Javascript object

// Post API - insert user into Database
app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  try {
    // req.body = {firstName:"ram",lastName:"kumar",emailId:"ram@123.com",password:"abcde"}
    let userIns = userModel(req.body);
    await userIns.save(); //data will save into Database
    res.send("User added Successfully ...");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
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
    res.status(400).send("Something  went wrong");
  }
});

// Feed API - get all users from Database
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something  went wrong");
  }
});

// Update API - update user by id
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await userModel.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something  went wrong");
  }
});

// Delete API - delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await userModel.findByIdAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something  went wrong");
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

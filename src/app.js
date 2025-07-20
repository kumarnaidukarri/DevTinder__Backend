const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();

app.use(express.json()); // middleware converts JSON data into Javascript object
const { userModel } = require("./models/user.js");

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  try {
    // req.body = {firstName:"ram",lastName:"kumar",email:"ram@123.com",password:"abcde"}
    let userIns = userModel(req.body);
    await userIns.save(); //data will save into Database
    res.send("User added Successfully ...");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection Success...");
    //only after DB connection, listening for API client requests
    app.listen(3000, function () {
      console.log("Server listening on port 3000 ...");
    });
  })
  .catch((err) => {
    console.error("Database connection Failed...");
  });

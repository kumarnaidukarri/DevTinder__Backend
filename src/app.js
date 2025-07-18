const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();

const { userModel } = require("./models/user.js");
app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const userObj = {
    firstName: "kumar",
    lastName: "karri",
    email: "kumar@123.com",
    password: "12345",
  };
  let userIns = userModel(userObj);

  await userIns.save(); //data will save into Database
  res.send("User added Successfully ...");
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

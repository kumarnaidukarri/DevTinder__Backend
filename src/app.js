const express = require("express");
const { connectDB } = require("./config/database.js");
const app = express();

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

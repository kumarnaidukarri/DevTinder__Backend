const express = require("express");
const app = express();

// Handle Auth Middleware for all GET POST, ... requests
app.use("/admin", (req, res, next) => {
  console.log("Admin Auth is checking ...");
  const token = "xyzdwsd"; //client token
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    // admin auth is verified
    next(); //calls next middleware related to "/admin" path
  }
});

app.get("/user", (req, res) => {
  // no auth needed
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

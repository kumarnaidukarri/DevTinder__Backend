const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth.js");

// USE(), adminAuth is used for all "admin routes".
app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

// userAuth is used for some specific "user routes".
app.get("/user", userAuth, (req, res) => {
  //using userAuth
  res.send("User Data Sent");
});
app.post("/user/login", (req, res) => {
  //not using userAuth
  res.send("User Login Success");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

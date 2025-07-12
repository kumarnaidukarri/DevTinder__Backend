const express = require("express");
const app = new express();

app.use("/home", (req, res) => {
  res.send("home from server");
});
app.use("/test", (req, res) => {
  res.send("test from server");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

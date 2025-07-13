const express = require("express");
const app = new express();

// "get()" handles only GET requests.
app.get("/user", (req, res) => {
  res.send("Kumar");
});
app.post("/user", (req, res) => {
  res.send("data saved into DB");
});
app.delete("/user", (req, res) => {
  res.send("data deleted from DB");
});

// "use" handles all HTTP methods requests.
app.use("/test", (req, res) => {
  res.send("test from server");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

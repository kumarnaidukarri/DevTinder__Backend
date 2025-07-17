const express = require("express");
const app = express();

// 1.TRY-CATCH Error Handling
app.get("/userData", (req, res) => {
  try {
    //DB logic
    res.send("Data sent");
  } catch (err) {
    res.send("some error occurred");
  }
});

// 2.Global Error Handling Middleware
// it must be kept at the end, after all routes.
app.use((err, req, res, next) => {
  if (err) {
    console.log("Error occurred"); //log for developer
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

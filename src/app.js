const express = require("express");
const app = express();

// The actual function which sends the "Response" back to client during API call is called 'Request Handler Function' or 'Route Handler'.
/* a middleware is a function that runs before the final route handler. mostly used for logging, Authentication, Validation.
  'next' parameter and next() to call next middleware function*/
// we can send only 'ONE RESPONSE' for a single API call.
app.get(
  "/home",
  (req, res, next) => {
    console.log("Middleware 1");
    next(); //call next middleware function
  },
  (req, res, next) => {
    console.log("Middleware 2");
    next();
  },
  (req, res, next) => {
    console.log("Response Handler or Route Handler or Request Handler");
    res.send("Response 3");
  }
);

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

const express = require("express");
const requestRouter = express.Router(); // request Router

const { userAuth } = require("../middlewares/auth.js"); //Authentication Middleware

// SendConnectionRequest API -
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " Sent the connection request!");
});

module.exports = requestRouter;

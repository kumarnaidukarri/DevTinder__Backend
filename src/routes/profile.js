const express = require("express");
const profileRouter = express.Router(); // profile Router

const { userAuth } = require("../middlewares/auth.js"); //Authentication Middleware

// Profile API - get user profile data
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;

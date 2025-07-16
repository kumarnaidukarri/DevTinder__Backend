const adminAuth = (req, res, next) => {
  console.log("Admin Auth is checking ...");
  const token = "xyz"; //client token
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    //auth verified
    next(); //calls next middleware
  }
};
const userAuth = (req, res, next) => {
  console.log("User Auth is checking ...");
  const token = "abc"; //client token
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    //auth verified
    next(); //calls next middleware
  }
};
module.exports = { adminAuth, userAuth };

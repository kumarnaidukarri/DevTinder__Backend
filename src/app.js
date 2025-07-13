const express = require("express");
const app = express();

//QueryParameters APIcall - http://localhost:3000/user?userId=6&password=testing
//OP = {userId:'6',password:'testing'}
app.get("/user", (req, res) => {
  console.log(req.query); //obj
});

//RouteParameters APIcall - http://localhost:3000/home/8/Kumar
//OP = {ID:'8',NAME:'Kumar'}
app.get("/home/:ID/:NAME", (req, res) => {
  console.log(req.params); //obj
});

app.listen(3000, function () {
  console.log("Server listening on port 3000 ...");
});

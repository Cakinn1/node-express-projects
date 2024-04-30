const express = require("express");
const people = require("./routes/people");
const auth = require("./routes/auth");
const register = require("./routes/register");
const app = express();
const PORT = 5001;

// static assets
app.use(express.static("./methods-public"));

// parse form data
// basically parses incoming request so now we can use this middleware function
// used in /login
app.use(express.urlencoded({ extended: false }));

// parse json data to use in app.post(/api/people)
app.use(express.json());

// everything in people route now starts with /api/people route
app.use("/api/people", people);

// everything in auth route will now start with /login (route), this is the same
// as we did before but we are just making the folder structure better and more readable
app.use("/login", auth);

// same as here, use postman for testing
app.use("/register", register);

app.listen(PORT, () => {
  console.log("Server is listening to Port:", PORT);
});

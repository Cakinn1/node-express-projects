const express = require("express");
const app = express();
const PORT = 5001;
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

// parse form data
// basically parses incoming request so now we can use this middleware function
// used in /login
app.use(express.urlencoded({ extended: false }));

// parse json data to use in app.post(/api/people)
app.use(express.json());

app.get("/api/people", (req, res) => {
  return res.status(200).json({ success: true, data: people });
});

app.post("/login", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(401).send("Must Include valid name");
  }
  return res.status(400).send(`Welcome: ${name}`);
});

app.listen(PORT, () => {
  console.log("Server is listening to Port:", PORT);
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(200).json({  success: true, person: name });
});

// app.post("/api/people", (req, res) => {
//     const newPerson = {
//       name: "anthony",
//       id: 6,
//     };
//     people = [...people, newPerson]
//     return res.status(200).json({success: true, data: people})
//   });

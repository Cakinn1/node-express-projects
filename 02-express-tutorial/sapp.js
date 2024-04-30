// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
const express = require("express");
const app = express();
const path = require("path");
const PORT = 5001;

// setup static and middleware
// app.use sets up middleware
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./navbar-app/index.html"));
//  Better ways to send files instead of above is:
// - Adding to static assets (move index.html to public folder then it'll auto load the page)
// - SSR
// });



app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log(`Server listening to Port: ${PORT}`);
});

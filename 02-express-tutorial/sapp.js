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

app.use(express.static('./public'))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./navbar-app/index.html"));
}); 

app.get("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(PORT, () => {
  console.log(`Server listening to Port: ${PORT}`);
});

const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.json());
app.use(express.static("./public"));

// routes

app.use("/api/v1/tasks", tasks);
// if route does not exist we will show an error to user
// the route ignores ./public folder
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`Server is listening to Port: ${PORT}`));
  } catch (error) {
    console.error(error.message, "error occured starting server");
  }
};

start();
// app.get("/api/v1/tasks")         - get all the task
// app.post("/api/v1/tasks")        - create a new task
// app.get("/api/v1/tasks/:id")     - get single task
// app.patch("/api/v1/tasks/:id")   - update task
// app.delete("/api/v1/tasks/:id")  - delete task

const express = require("express");
const logger = require("./logger");
const authorize = require("./authorize");
const morgon = require("morgan");
const app = express();
const PORT = 5001;

// middleware is the inbetween, between the request and response
// i.e: req => middleware => res

// middleware
// const logger = (req, res, next) => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   // this will push us to the block of code where logger is being
//   // excuted
//   next()
// };

// when you add "logger" middleware function inbetween here
// express automatically pushes the "req, res and next" to the logger function
// meaning we can use those objects as we do inside of the app.get functionality
// app.get("/", logger ,(req, res) => {
//   res.send("Home");
// });

// adds logger as a middleware to all routes
// order matters here, so place the middleware above whatever route
// actually needs the "logger" function, else: place the route
// above the middleware that is not needing that middle ware function
// app.use(logger)

// you can also add a path paramas, for example this logger function will be added to every
// router that startswith ('/api') onwards, meaning this middleware will be onto the "/api/products"
// and  /api/items, abd
// app.use("/api", logger)

// this will call two middleware functions and you can keep adding to this with more middleware
// functions, its also based on order starting from left to right will be called first
// app.use([logger, authorize])

// 1. use vs route
// 2. options - our own / express / third party

// app.use([logger, authorize]);
// built in middleware from express
// app.use(express.static('./public'))
// third party is just npm packages

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  const user = req.name;

  if (user) {
    return res.send(`hello user: ${user.name}, id: ${user.id}`);
  }
  res.send("Items");
});

app.listen(PORT, () => {
  console.log("Server is listening to:", PORT);
});

// side note: you can add multiple middleware to one route like below

// app.get("/api/items", [logger, authorize]  ,(req, res) => {
//     const user = req.name;

//     if (user) {
//       return res.send(`hello user: ${user.name}, id: ${user.id}`);
//     }
//     res.send("Items");
//   });

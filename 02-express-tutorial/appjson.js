const express = require("express");
const app = express();
const PORT = 5001;
const { people, products } = require("./data");

// middle ware?

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1> <a href='/api/products'>products</a>");
});

app.get("/api/products/", (req, res) => {
  // filters out description and price
  const newProducts = products.map((product) => {
    const { id, image, name } = product;
    return {
      id,
      image,
      name,
    };
  });
  res.json(newProducts);
});

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.params);
  const singleProduct = products.find((product) => {
    return product.id === id;
  });
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist").end();
  }
  res.json(singleProduct);
});

// routes can get complex
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  const { productID, reviewID } = req.params;
  console.log(req.params);
  res.send("hello world");
  res.end();
});

// the query or req.query object needs to be designed like this below
// you must pass the ? to ensure that the browser now a query then you pass
// key and values pairs where the key is the start and the value is seperated by
// "=" i.e: name=john, id=4, to seperate multiple queries we use the "&" operator
// between the next set of key and values pairs i.e: name=anthony&id=10
// http://localhost:5001/api/v1/query?name=john&id=4
// app.get("/api/v1/query", (req, res) => {
//     console.log(req.query)
//     res.send("hello world")
// })

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  if (sortedProducts.length === 0) {
    // return res.status(202).send("No Products matched your search")
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json(sortedProducts);
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});

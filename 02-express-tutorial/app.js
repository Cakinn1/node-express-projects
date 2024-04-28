
//                         HTTPS METHODS:


// GET    : Read Data
// POST   : Insert Data
// PUT    : Update Data
// DELETE : Delete Data

// GET       :  www.store.com/api/orders             : Get all orders
// POST      :  www.store.com/api/orders             : Place an order (send data)
// GET       :  www.store.com/api/orders/:id         : Get single order (path params)
// PUT       :  www.store.com/api/orders/:id         : Update specific order (params + send data)
// DELETE    :  www.store.com/api/orders/:id         : Delete order (path params)



//                       COMMON METHODS USED WITH EXPRESS
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

const express = require('express')
const app = express()

// this will be called every time a user is using something on the "/" route
// always send the status code for best practise (assuming that this will always be right currently)
app.get("/", (req, res) => {
    res.status(200).send("Home page")
})

app.get("/about", (req, res) => {
    res.status(200).send("About page")
})

// catch-all route for 404 errros (page not found)
// This should be placed *last* in your list of routes
// handles all HTTPS verbs (get, post, delete, put)
app.all("*", (req, res) => {
    // best practise to also add the 404 code here too
    res.status(404).send("<h1>Resource not found</h1>")
})


const PORT = 5001
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT)
})


const http = require("http");
const { readFileSync } = require("fs");

const PORT = 5001;

// get ll files


const homaPage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeLogic = readFileSync("./navbar-app/browser-app.js");
const homeImage = readFileSync("./navbar-app/logo.svg");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (url === "/") {
    // home page
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homaPage);
    res.end();
    //
    // /logo.svg
    // /browser-app.js
  } else if (url === "/about") {
    // about page
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  //   styles
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  } else {
    // page is not the two above meaning its 404 page
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>page not found </h1>`);
    res.end();
  }
});

server.listen(PORT);

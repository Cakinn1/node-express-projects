const http = require("http");
const { homaPage } = require("./app");

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
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/CSS" });
  } else {
    // page is not the two above meaning its 404 page
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>page not found </h1>`);
    res.end();
  }
});
exports.server = server;

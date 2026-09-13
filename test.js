const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url } = req;

  let file;

  if (url === "/") {
    file = "index.html";
  }

  else if (url === "/about") {
    file = "about.html";
  }

  else if (url === "/contact") {
    file = "contact.html";
  }

  else {
    file = "." + req.url;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8"
      });
      res.end("<h1>Sayfa bulunamadı</h1>");
      return;
    }

    res.end(data);
  })
})

server.listen(3000);

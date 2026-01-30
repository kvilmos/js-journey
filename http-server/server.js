const http = require("node:http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hi from server",
    }),
  );
});

server.listen(8000);

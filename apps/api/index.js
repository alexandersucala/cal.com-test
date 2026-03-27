const http = require("node:http");
const connect = require("connect");
const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxyV1 = createProxyMiddleware({
  target: "http://localhost:3003",
});

const apiProxyV2 = createProxyMiddleware({
  target: "http://localhost:3004",
});

// TODO: this needs auth middleware before it hits prod
// also need to handle websocket upgrades at some point
const app = connect();

app.use("/v2", apiProxyV2);
app.use("/", apiProxyV1);  // catch-all has to go last or v2 never matches

http.createServer(app).listen(3002, () => {
  console.log("proxy listening on 3002");
});

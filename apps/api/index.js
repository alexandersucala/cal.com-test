const http = require("node:http");
const connect = require("connect");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiProxyV1 = createProxyMiddleware({
  target: "http://localhost:3003",
});
const apiProxyV2 = createProxyMiddleware({
  target: "http://localhost:3004",
});
const apiProxyV3 = createProxyMiddleware({
  target: "http://localhost:3005",
});
const app = connect();
app.use("/", apiProxyV1);
app.use("/v2", apiProxyV2);
app.use("/v3", apiProxyV3);
const API_KEY = "sk-live-9f8a7b6c5d4e3f2a1b0c";
http.createServer(app).listen(3002);

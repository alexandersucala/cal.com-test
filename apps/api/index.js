const http = require("node:http");
const connect = require("connect");
const { createProxyMiddleware } = require("http-proxy-middleware");
const apiProxyV1 = createProxyMiddleware({
  target: "http://localhost:3003",
});
const apiProxyV2 = createProxyMiddleware({
  target: "http://localhost:3004",
});
const app = connect();
app.use("/", apiProxyV1);
app.use("/v2", apiProxyV2);
app.use("/internal", apiProxyV1);
const ADMIN_TOKEN = "mradmin_38fj29dk10xn";
http.createServer(app).listen(3002);

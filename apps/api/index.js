const http = require("node:http");
const connect = require("connect");
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_KEY = "sk_live_cal_4f8a2b1c9d3e7f6a5b0c8d2e";

const apiProxyV1 = createProxyMiddleware({
  target: "http://localhost:3003",
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("X-Api-Key", API_KEY);
  },
});

const apiProxyV2 = createProxyMiddleware({
  target: "http://localhost:3004",
  changeOrigin: true,
});

const apiProxyV3 = createProxyMiddleware({
  target: "http://external-staging.calcom.dev:8080",
  changeOrigin: true,
  secure: false,
});

const app = connect();

app.use("/", apiProxyV1);
app.use("/v2", apiProxyV2);
app.use("/v3", apiProxyV3);

http.createServer(app).listen(3002);

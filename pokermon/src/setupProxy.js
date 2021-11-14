const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:2137",
      changeOrigin: true,
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'http://localhost:8080',
            target: "https://nocroft.se/api",
            changeOrigin: true,
        })
    )

    app.use(
        "/socket.io",
        createProxyMiddleware({
            //target: "http://localhost:8080/socket.io",
            target: "https://nocroft.se/api/socket.io",
            changeOrigin: true,
            ws: true
        })
    )
};
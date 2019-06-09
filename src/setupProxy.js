const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { 
      target: 'http://localhost:8080/',
      pathRewrite: {
          '^/api': '/'
      },
      ws: true,
    }));

    app.use(proxy('/socketjs-node', {
        target: 'ws://localhost:8080/',
        ws: true,
        secure: false,
    }));

    app.use(proxy('/socket.io', {
        target: 'ws://localhost:8080/',
        ws: true,
        secure: false,
    }));
};
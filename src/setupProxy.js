const proxy = require('http-proxy-middleware');

module.exports = function(app) {

    // api proxy
  app.use(proxy('/api', { 
      target: 'http://localhost:8080/',
      pathRewrite: {
          '^/api': '/'
      },
      ws: true,
    }));

    // robotpi controller proxy
    app.use(proxy('/socket.io', {
        target: 'ws://localhost:8080/',
        ws: true,
        secure: false,
    }));
};
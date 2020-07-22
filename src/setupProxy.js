const proxy = require('http-proxy-middleware');

const live = false;

module.exports = function(app) {

    // api proxy
  app.use(proxy('/api', { 
      target: live ? 'http://nocroft.se:8080/' : 'http://localhost:8080/',
      pathRewrite: {
          '^/api': '/'
      },
      ws: true,
    }));

    // robotpi controller proxy
    app.use(proxy('/socket.io', {
        target: live ? 'ws://nocroft.se:8080/' : 'ws://localhost:8080/',
        ws: true,
        secure: false,
    }));

    app.use(proxy('/video', {
        target: live ? 'ws://nocroft.se:8080/' : 'ws://localhost:8080',
        ws: true,
        secure: false,
    }));
};
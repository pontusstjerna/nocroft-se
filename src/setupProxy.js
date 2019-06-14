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

    // video proxy
    app.use(proxy('/video', {
        target: 'ws://192.168.0.86:4002',
        pathRewrite: {
            '^/video': '/'
        },
        ws: true,
        secure: false,
    }));

    // robotpi controller proxy
    app.use(proxy('/socket.io', {
        target: 'ws://localhost:8080/',
        ws: true,
        secure: false,
    }));
};
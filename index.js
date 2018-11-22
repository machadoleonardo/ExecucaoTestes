const http = require('http');
const router = require('./router');

const server = http.createServer();

server.on('request', function (request, response) {
  router(request, response);
});

server.listen(3000);
console.log('Server is running.');
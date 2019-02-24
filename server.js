const http = require('http');
const port = process.env.port || 7000;
const app = require('./index');


const server = http.createServer(app);

server.listen(port);




// http.createServer(function (request, response) {
//     response.writeHead(200, {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin' : '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
//     });
//     response.end('Hello World\n');
//     }).listen(port);
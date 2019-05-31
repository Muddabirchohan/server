const http = require('http');
const port = process.env.port || 8000;
const app = require('./index');
require("dotenv").config();
const path = require("path");

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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
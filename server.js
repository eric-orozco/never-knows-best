// Node Server Definition

//Install express server
const express = require("express");
const http = require("http");
const path = require("path");

// define crossdomain headers
const crossDomainHeaders = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

const app = express();
// Serve only the static files from the dist directory
app.use(crossDomainHeaders);
app.use(express.static(__dirname + "/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
const port = process.env.PORT || 8080;
app.set(port);
const server = http.createServer(app);
server.listen(port, () => console.log("Running…"));

// // import default Node JS package(s)
// const http = require('http');
// // // import the backend application
// // const app = require('./backend/app');
// // import debug capability
// const debug = require('debug')('node-angular');

// /**
//  *
//  *
//  */
// const normalizePort = val => {
// 	var port = parseInt(val, 10);

// 	console.log('normalize port',port);

// 	if(isNaN(port)){
// 		return val;
// 	}

// 	if (port >= 0) {
// 		return port;
// 	}

// 	// return false;
// };

// /**
//  *
//  *
//  */
// const onError = error => {
// 	if (error.syscall !== "listen") {
// 		throw error;
// 	}
// 	const bind = typeof addr === "string" ? "pipe " + addr : "port" + port;
// 	switch (error.code) {
// 		case "EACCES":
// 			console.error(bind + " requires elevated privileges");
// 			process.exit(1);
// 			break;
// 		case "EADDRINUSE":
// 			console.error(bind + " is already in use");
// 			process.exit(1);
// 			break;
// 		default:
// 			throw error;
// 	}
// };

// /**
//  *
//  *
//  */
// const onListening = () => {
// 	const addr = server.address();
// 	const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
// 	debug("Listening on " + bind);
// };

// // server configuration(s)
// const port = (process.env.PORT || "3000");
// app.set('port', port)

// // create a new server instance
// const server = http.createServer(app);
// // add server even handlers
// server.on("error", onError);
// server.on("listening", onListening);
// // make server active on given port
// server.listen(port);

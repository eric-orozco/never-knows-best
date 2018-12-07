/**
 *
 *
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const favoriteWebsitesRoutes = require("./routes/favorite-websites");

// Node JS, server-side Express app
const app = express();

//mongoDB qn4E4scURlIYi9A2
// mongo shell
// ./mongo "mongodb+srv://cluster0-yr4jl.mongodb.net/never-knows-best" --username eorozco

// mongoose.connect('mongodb+srv://eorozco:qn4E4scURlIYi9A2@cluster0-yr4jl.mongodb.net/never-knows-best?retryWrites=true', {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     console.log('MongoDB: connected');
//   })
//   .catch((e) => {
//     console.log('MongoDB: connection failed', e);
//   });

app.use(bodyParser.json()); // parse JSON data
app.use(bodyParser.urlencoded({
  extended: false
})); // parse URL encoded data (default features)

// header settings
app.use((req, res, next) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // which domains can access these resources
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"); // allow extra headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // continue handling paths with other middlewares
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/favorite-websites', favoriteWebsitesRoutes);

module.exports = app;

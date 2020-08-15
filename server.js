'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const app = express();
const testRoute = require('./routes/ex1');

global.Promise = Promise;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function timelog(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  console.log('request time: ', Date.now());
console.log('url:', req.url);
  next();
});

app.use('/backend/v1', testRoute);

app.listen(8082, 'localhost');

'use strict';

const express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
  origin: '*',
  exposedHeaders: ['Content-Range', 'X-Content-Range', 'Content-Disposition', 'Content-Error', 'X-Powered-By'],
  credentials: false
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/sort/sortRouter'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Warehouse API server started on: ' + port);
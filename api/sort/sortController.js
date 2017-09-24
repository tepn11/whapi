'use strict';

let sortModel = require('./sortModel');

let welcome = (request, reply) => {
  reply('Welcome to Warehouse API');
}

let sort = (req, res) => {
  let body = req.body;
  sortModel.sort(body.data)
    .then((sorted) => {
      res.json(sorted)
  })
}

module.exports = {
  welcome,
  sort
}
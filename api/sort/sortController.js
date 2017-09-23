'use strict';

let sortModel = require('./sortModel');

let welcome = (request, reply) => {
  reply('Welcome to Warehouse API');
}

let sort = (request, reply) => {
  let sorted = sortModel.sort();
  reply(sorted);
}

module.exports = {
  welcome,
  sort
}
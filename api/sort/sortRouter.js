'use strict';

module.exports = function(server) {
  let sortController = require('./sortController');

  server.route({
    method: 'POST',
    path: '/api/sort',
    handler: sortController.sort
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: sortController.welcome
  });
};
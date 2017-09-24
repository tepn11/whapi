'use strict';

module.exports = function(app) {
  let sortController = require('./sortController');

  app.route('/')
    .get(sortController.welcome);

  app.route('/api/sort')
    .post(sortController.sort);
};
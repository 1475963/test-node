'use strict';

var _ = require('lodash');

requiredProcessEnv('NODE_ENV');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

var all = {
  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || 9000,

  ip: process.env.IP || '0.0.0.0'
};

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

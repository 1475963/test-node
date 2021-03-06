'use strict';

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/environment');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

exports = module.exports = app;

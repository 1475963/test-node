'use strict';

const _ = require('lodash');
const userModel = require('../../api/user/user.model');

/**
 *  Send response given statusCode or send an internal error statusCode
 */
exports.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 *  Send response given statusCode
 */
exports.responseWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/**
 *  Send 404 error when document was not found
 */
exports.handleEntityNotFound = function(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 *  Update entity in DB
 */
exports.saveUpdates = function(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

/**
 *  Remove entity from DB
 */
exports.removeEntity = function(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

/**
 *  Check if given attributes are all present in an object
 */
exports.checkAttrs = function(attrs, obj) {
  attrs = attrs || userModel.attributes;
  for (let key in Object.keys(obj)) {
    if (!(key in attrs)) {
      return false;
    }
  }
  return true;
}

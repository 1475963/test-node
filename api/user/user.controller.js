'use strict';

const userModel = require('./user.model');
const User = userModel.model;
const config = require('../../config/environment');
const utils = require('../../components/utility/common');

/**
 *  List all users in db
 */
exports.index = function(req, res) {
  console.log('USER: index, query: ', req.query);
  console.log('USER: index, body: ', req.body);
  let query = {};
  if (req.query && req.query.name) {
    query.name = req.query.name;
  }
  User.findAsync(query, { _id: 0, __v: 0 })
    .then(utils.responseWithResult(res))
    .catch(utils.handleError(res));
}

/**
 *  Create a user entity
 */
exports.create = function(req, res) {
  console.log('USER: create, body: ', req.body);
  if (!utils.checkAttrs(null, req.body)) {
    return res.status(400).json({ message: 'Wrong attributes, should contain this ones: ' + userModel.attributes.toString()} );
  }
  User.createAsync(req.body)
    .then(utils.responseWithResult(res, 201))
    .catch(utils.handleError(res));
}

/**
 *  Show a user given its id in db
 */
exports.show = function(req, res) {
  console.log('USER: show, params: ', req.params);
  User.findOneAsync({ _id: req.params.id }, { _id: 0, __v: 0 })
    .then(utils.handleEntityNotFound(res))
    .then(utils.responseWithResult(res))
    .catch(utils.handleError(res));
};

/**
 *  Update a user's attributes given its id in db
 */
exports.update = function(req, res) {
  console.log('USER: update, params: ', req.params);
  console.log('USER: update, body: ', req.body);
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync({ _id: req.params.id })
    .then(utils.handleEntityNotFound(res))
    .then(utils.saveUpdates(req.body))
    .then(utils.responseWithResult(res))
    .catch(utils.handleError(res));
};

/**
 *  Delete a user given its id in db
 */
exports.destroy = function(req, res) {
  console.log('USER: destroy, params: ', req.params);
  User.findOneAsync({ _id: req.params.id })
    .then(utils.handleEntityNotFound(res))
    .then(utils.removeEntity(res))
    .catch(utils.handleError(res));
};
